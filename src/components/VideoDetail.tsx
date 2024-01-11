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

const VideoDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lecture = location.state as Lecture;
  const lastSlashIndex = lecture.video_link.lastIndexOf('/');
  const questionMarkIndex = lecture.video_link.indexOf('?');

  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<string[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [similarLectures, setSimilarLectures] = useState<Lecture[]>([]);

  useEffect(() => {
    checkEnrollmentStatus();
  }, []);

  const checkEnrollmentStatus = () => {
    const userId = 'abc'; // Replace with actual user ID
    // Fetch user's lecture list and check if the current lecture is in the list
    fetch(process.env.REACT_APP_API_URL + `/lecture/${userId}/user-lectures`)
      .then((response) => response.json())
      .then((userLectures) => {
        const isInList = userLectures.some((userLecture: Lecture) => userLecture.lectureId === lecture.lectureId);
        setIsEnrolled(isInList);
      })
      .catch((error) => console.error('Error fetching user lectures:', error));
  };

  const handleAddToMyLectures = () => {
    const userMyLectureRequest = {
      userId: 'abc', // Replace with actual user ID
      lectureId: lecture.lectureId,
    };

    fetch(process.env.REACT_APP_API_URL + `/lecture/add-mylecture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMyLectureRequest),
    })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: '수강신청이 완료되었습니다.',
          text: '내 강의실에서 확인해주세요!',
          showConfirmButton: false,
          timer: 1500,
        });
        // After successful enrollment, update the state to show the new button
        setIsEnrolled(true);
      })
      .catch((error) => {
        console.error('Error adding lecture to My Lectures:', error);
      });

    // Fetch user's lecture list and check if the current lecture is in the list
    fetch(process.env.REACT_APP_API_URL + `/lecture/${lecture.lectureId}/recommend-lectures`)
      .then((response) => response.json())
      .then((recommendLectures) => {
        setSimilarLectures(recommendLectures);
        // Show toast with similar lectures
        showSimilarLecturesToast(recommendLectures);
      })
      .catch((error) => console.error('Error fetching user lectures:', error));
  };

  const showSimilarLecturesToast = (lectures: Lecture[]) => {
    const toastContent = (
      <div style={{ maxHeight: '50vh', width:'96vw', marginLeft:'1vw'}}>
        <p className='text-2xl font-bold' style={{marginBottom:'2vh'}}>이런 강의는 어때요?</p>
        <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={1}>
          {lectures.map((similarLecture) => (
            <Link to={`/video/${similarLecture.lectureId}`} state={similarLecture}>
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
    navigate(`/user/:userId`);
  };

  return (
    <>
      <div className="w-full bg-[#002333]">
        <div className="container mx-auto px-4 md:px-6 py-8 flex gap-20">
          <div className={'mb-10 w-2/3'}>
            <YouTube
              videoId={lecture.video_link.substring(lastSlashIndex + 1, questionMarkIndex)}
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
            <p className={'text-white '}>{lecture.published_date.toLocaleString()}</p>
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

export default VideoDetail;
