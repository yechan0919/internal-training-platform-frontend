import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import useLectureReviewList from '../hooks/useLectureReviewList';
import Swal from 'sweetalert2';
import {useAuthStore} from "../store/auth";
import request from "../api/axiosAPI";

interface LectureReviewProps {
  lectureId: number;
}

const ReviewList: React.FC<LectureReviewProps> = ({ lectureId }) => {
  const { data: reviews = [], mutate } = useLectureReviewList(lectureId);
  const { user } = useAuthStore();

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedReviewContent, setEditedReviewContent] = useState<string>('');
  const [editedReviewTitle, setEditedReviewTitle] = useState<string>('');
  const [comment, setComment] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState<string>('Review Title'); // Default title for new reviews


  const handleAddReview = async () => {
      if(user){
        request.post('/review/create-review', {
          userId: user.userId,
          lectureId: lectureId,
          title: newReviewTitle,
          content: comment.trim(),
        }).then((res) => {
          if(res.status === 200) {
            const Toast = Swal.mixin({
              toast: true,
              position: 'center',
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: false,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })

            Toast.fire({
              icon: 'success',
              title: '좋은 의견 감사합니다.'
            })

            // If the review creation is successful, refresh the reviews
            setComment('');
            setNewReviewTitle('Review Title'); // Reset the title for the next review
            mutate();
          } else {
            console.error('Failed to create review:', res.status);
          }
        }).catch((error) => {{
          console.error('Error creating review:', error);
        }})
      }
  };

  const handleSaveReview = async (index: number) => {
    try{
      request.put('/review/update-review', {
        reviewId: reviews[index].review_id,
        title: editedReviewTitle,
        content: editedReviewContent,
      })
      mutate();
      setEditingIndex(null);
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
  };

  const handleDeleteReview = async (index: number) => {
    try{
      if(user){
        request.put('/review/delete-review',{
          reviewId: reviews[index].review_id,
          userId: user.userId,
          lectureId: lectureId,
        }).then( (res) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: false,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })

          Toast.fire({
            icon: 'success',
            title: '정상적으로 삭제되었습니다.'
          })
          mutate();
        })
      }
    }catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleLikeReview = async (reviewId: number) => {
    try{
      if(user){
        request.put('/review/like-review', {
          userId: user.userId,
          lectureId: lectureId,
          reviewId: reviewId,
        })
        mutate();
      }
    }catch (error) {
      console.error('Error liking review:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-4 flex items-center">
          <textarea
            className="w-2/3 p-2 border border-sky-300 rounded-md focus:outline-none focus:border-sky-400"
            placeholder="강의에 대한 의견을 들려주세요!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className="ml-4 bg-sky-200 text-gray-500 border border-sky-300 font-medium px-4 py-2 rounded-md hover:bg-sky-400 focus:outline-none"
            onClick={handleAddReview}
          >
            등록
          </button>
        </div>
        <hr style={{marginBottom:"2vh"}}/>
        {reviews.map((review, index) => (
          <div key={index} className="border border-sky-300 rounded-md p-4 mb-4 flex justify-between items-center">
            <div>
              {editingIndex === index ? (
                <>
                  <textarea
                    value={editedReviewContent}
                    onChange={(e) => setEditedReviewContent(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <input
                    type="text"
                    value={editedReviewTitle}
                    onChange={(e) => setEditedReviewTitle(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 mb-2"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
                      onClick={() => handleSaveReview(index)}
                    >
                      Save
                    </button>
                    <button
                      className="text-red-500 hover:underline cursor-pointer focus:outline-none"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-700" style={{marginBottom:"3vh", fontWeight:"bold"}}>{review.user.user_name}</p>
                  <p className="text-gray-700" style={{marginBottom:"2vh"}}>{review.content}</p>
                  <p className="text-xs text-gray-500">{`${new Date(review.createdAt).toLocaleString().split('T')[0]}`}</p>
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {user && user.userId === review.user.userId && (
                <>
                  <button
                    className="text-sky-300 hover:underline cursor-pointer focus:outline-none"
                    onClick={() => handleDeleteReview(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
              <button
                className="text-pink-300 hover:underline cursor-pointer focus:outline-none"
                onClick={() => handleLikeReview(review.review_id)}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span className="ml-1">{review.likeCnt}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReviewList;
