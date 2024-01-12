import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import ReviewList from './ReviewList';
import { GrChannel } from 'react-icons/gr';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lecture from '../models/Lecture';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from "../api/axiosAPI";
import {useAuthStore} from "../store/auth";

const LectureDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lecture = location.state as Lecture;

  const { user } = useAuthStore();
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    checkEnrollmentStatus();
  }, [user]);

  const checkEnrollmentStatus = () => {
    if(user){
        request.get(`/lecture/${user.userId}/user-lectures`)
            .then((res) => {
                if (res.status === 200) {
                  const isInList = res.data.some((userLecture: Lecture) => userLecture.lectureId === lecture.lectureId);
                  setIsEnrolled(isInList);
                }
        })
    }
  };

  const handleAddToMyLectures = () => {
    if(user) {
      request.post('/lecture/add-mylecture', {
        userId: user.userId, // Replace with actual user ID
        lectureId: lecture.lectureId,
      }).then((res) => {
        if (res.status === 200) {
          Swal.fire({
                  icon: 'success',
                  title: '수강신청이 완료되었습니다.',
                  text: '내 강의실에서 확인해주세요!',
                  showConfirmButton: false,
                  timer: 1500,
                });
          setIsEnrolled(true);
        }
      }).catch((error) => {
            console.error('Error adding lecture to My Lectures:', error);
          });
    }

    if(user) {
      request.get(`/lecture/${lecture.lectureId}/recommend-lectures`)
          .then((res) => {
        if (res.status === 200) {
          showSimilarLecturesToast(res.data);
        }
      }).catch((error) => console.error('Error fetching user lectures:', error));
    }
  };

  const showSimilarLecturesToast = (lectures: Lecture[]) => {
    const toastContent = (
      <div style={{ maxHeight: '50vh', width:'96vw', marginLeft:'1vw'}}>
        <p className='text-2xl font-bold' style={{marginBottom:'2vh'}}>이런 강의는 어때요?</p>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={1}>
          {lectures.map((similarLecture) => (
            <Link to={`/lecture/${similarLecture.lectureId}`} state={similarLecture} key={similarLecture.lectureId} onClick={() => {
              toast.dismiss();
            }}>
            <div key={similarLecture.lectureId} className="carousel-item">
                <img className="h-50 w-50 flex-none" src={similarLecture.thumbnail_url} alt={similarLecture.title} />
                <p className='font-semibold text-sm'>{similarLecture.title}</p>

            </div>
            </Link>
          ))}
        </Slider>
      </div>
    );

    toast.dark(toastContent, {
      position: 'bottom-center',
      autoClose: 30000, // Adjust the duration as needed
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
    });
  };

  const navigateToMyPage = () => {
    // Replace ":userId" with the actual user ID
    navigate(`/my-page`);
  };

  return (
    <>
      <div className="w-full bg-[#002333]">
        <div className="container mx-auto px-4 md:px-6 py-8 flex gap-20">
          <div className={'mb-10 w-2/3'}>
            <YouTube
              videoId={lecture.video_link.split('v=')[1]}
              opts={{
                width: '100%',
                height: '400vh',
                playerVars: {
                  autoplay: 1,
                  rel: 0,
                  modestbranding: 1,
                },
              }}
              onEnd={(e) => {
                e.target.stopVideo(0);
              }}
            />
          </div>
          <div className={'my-auto flex flex-col'}>
            <p className={'text-xl text-white mb-2'}>{lecture.topic}</p>
            <p className="text-3xl font-bold mb-4 text-white">{lecture.title}</p>
            <p className={'text-white '}>{lecture.description}</p>
            <p className={'text-white mt-3'}>Published at: {new Date(lecture.published_date).toISOString().split('T')[0]}</p>
            <div className={'text-white flex space-x-2 items-center'} style={{ marginTop: '6vh' }}>
              <GrChannel />
              <p className={' '}>{lecture.channel_name}</p>
            </div>
            <div style={{ display: 'flex', marginTop: 'auto', marginLeft: 'auto' }}>
              {isEnrolled ? (
                <button
                  className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none"
                  onClick={navigateToMyPage}
                >
                  내 강의실로 보러가기
                </button>
              ) : (
                <button
                  className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-700 focus:outline-none"
                  onClick={handleAddToMyLectures}
                >
                  바로 수강신청 하기
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-6 py-8 flex border-b border-gray-800">
        <p className={'font-bold text-2xl'}>COMMENT</p>
      </div>
      <ReviewList lectureId={lecture.lectureId} />
      <ToastContainer style={{width:"100vw"}}/>
    </>
  );
};

export default LectureDetail;
