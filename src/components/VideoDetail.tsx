import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import ReviewList from './ReviewList';
import { GrChannel } from 'react-icons/gr';
import Swal from 'sweetalert2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Lecture from "../models/Lecture";

const VideoDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lecture = location.state as Lecture;
  const lastSlashIndex = lecture.video_link.lastIndexOf('/');
  const questionMarkIndex = lecture.video_link.indexOf('?');

  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<string[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [showSimilarLecturesModal, setShowSimilarLecturesModal] = useState(false);
  const [similarLectures, setSimilarLectures] = useState<Lecture[]>([]);


  useEffect(() => {

    checkEnrollmentStatus();
  }, []);

  const checkEnrollmentStatus = () => {
    const userId = "abc"; // Replace with actual user ID
    // Fetch user's lecture list and check if the current lecture is in the list
    fetch(process.env.REACT_APP_API_URL + `/lecture/${userId}/user-lectures`)
      .then(response => response.json())
      .then(userLectures => {
        const isInList = userLectures.some((userLecture: Lecture) => userLecture.lectureId === lecture.lectureId);
        setIsEnrolled(isInList);
      })
      .catch(error => console.error('Error fetching user lectures:', error));
  };
  

  const handleAddToMyLectures = () => {
    const userMyLectureRequest = {
      userId: "abc", // Replace with actual user ID
      lectureId: lecture.lectureId,
    };

    fetch(process.env.REACT_APP_API_URL + `/lecture/add-mylecture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userMyLectureRequest),
    })
      .then(response => {
        Swal.fire({
          icon: "success",
          title: "수강신청이 완료되었습니다.",
          showConfirmButton: false,
          timer: 1500
        });
        // After successful enrollment, update the state to show the new button
        setIsEnrolled(true);
      })
      .catch(error => {
        console.error('Error adding lecture to My Lectures:', error);
        // alert('An error occurred while adding the lecture to My Lectures.');
      });
        
    // Fetch user's lecture list and check if the current lecture is in the list
    fetch(process.env.REACT_APP_API_URL + `/lecture/${lecture.lectureId}/recommend-lectures`)
      .then(response => response.json())
      .then(recommendLectures => {
        setSimilarLectures(recommendLectures);
        setShowSimilarLecturesModal(true);
      })
      .catch(error => console.error('Error fetching user lectures:', error));

  };

  const navigateToMyPage = () => {
    // Replace ":userId" with the actual user ID
    navigate(`/user/:userId`);
  };

  const closeSimilarLecturesModal = () => {
    setShowSimilarLecturesModal(false);
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
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                  onClick={navigateToMyPage}
                >
                  내 강의실로 보러가기
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
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
      {/* Similar Lectures Modal */}
      {showSimilarLecturesModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeSimilarLecturesModal}>
              &times;
            </span>
            <h2>Similar Lectures</h2>
            <Slider dots={true} infinite={true} speed={500} slidesToShow={3} slidesToScroll={1}>
              {similarLectures.map(similarLecture => (
                <div key={similarLecture.lectureId} className="carousel-item">
                  <img src={similarLecture.thumbnail_url} alt={similarLecture.title} />
                  <p>{similarLecture.title}</p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDetail;
