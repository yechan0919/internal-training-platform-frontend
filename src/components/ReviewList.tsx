import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import useLectureReviewList from '../hooks/useLectureReviewList';

interface LectureReviewProps {
  lectureId: number;
}

const RecommendationLecture: React.FC<LectureReviewProps> = ({ lectureId }) => {
  const { data: reviews = [], mutate } = useLectureReviewList(lectureId);
  const currentUser = 'abc'; // Replace with the actual userId or get it from your authentication state

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedReviewContent, setEditedReviewContent] = useState<string>('');
  const [editedReviewTitle, setEditedReviewTitle] = useState<string>('');
  const [comment, setComment] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState<string>('Review Title'); // Default title for new reviews

  const handleAddReview = async () => {
    try {
      // Call the API to create a review
      const response = await fetch(process.env.REACT_APP_API_URL + `/review/create-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser,
          lectureId: lectureId,
          title: newReviewTitle,
          content: comment.trim(),
        }),
      });

      if (response.ok) {
        // If the review creation is successful, refresh the reviews
        setComment('');
        setNewReviewTitle('Review Title'); // Reset the title for the next review
        mutate();
      } else {
        console.error('Failed to create review:', response.status);
      }
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const handleEditReview = (index: number) => {
    setEditingIndex(index);
    setEditedReviewContent(reviews[index].content);
    setEditedReviewTitle(reviews[index].title);
  };

  const handleSaveReview = async (index: number) => {
    try {
      // Call the API to edit the review
      await fetch(process.env.REACT_APP_API_URL + `/review/update-review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reviewId: reviews[index].review_id,
          title: editedReviewTitle,
          content: editedReviewContent,
        }),
      });
      // Refresh the reviews after editing
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
    const confirmDelete = window.confirm('Are you sure you want to delete this review?');
    if (confirmDelete) {
      try {
        // Call the API to delete the review
        await fetch(process.env.REACT_APP_API_URL + `/review/delete-review`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reviewId: reviews[index].review_id,
            userId: currentUser,
            lectureId: lectureId,
          }),
        });
        // Refresh the reviews after deleting
        mutate();
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const handleLikeReview = async (reviewId: number) => {
    try {
      // Call the API to like the review
      await fetch(process.env.REACT_APP_API_URL + `/review/like-review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: currentUser,
          lectureId: lectureId,
          reviewId: reviewId,
        }),
      });
      // Refresh the reviews after liking
      mutate();
    } catch (error) {
      console.error('Error liking review:', error);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="mb-4 flex items-center">
          <textarea
            className="w-2/3 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="강의에 대한 의견을 들려주세요!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {/* <input
            type="text"
            className="ml-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Review Title"
            value={newReviewTitle}
            onChange={(e) => setNewReviewTitle(e.target.value)}
          /> */}
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
            onClick={handleAddReview}
          >
            작성
          </button>
        </div>
        <hr style={{marginBottom:"2vh"}}/>
        {reviews.map((review, index) => (
          <div key={index} className="border border-gray-300 rounded-md p-4 mb-4 flex justify-between items-center">
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
                  {/* <p className="text-xs text-gray-500">{`Title: ${review.title}`}</p> */}
                </>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {currentUser === review.user.user_id && (
                <>
                  {/* {editingIndex !== index && (
                    <button
                      className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
                      onClick={() => handleEditReview(index)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </button>
                  )} */}
                  <button
                    className="text-blue-500 hover:underline cursor-pointer focus:outline-none"
                    onClick={() => handleDeleteReview(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </>
              )}
              <button
                className="text-pink-500 hover:underline cursor-pointer focus:outline-none"
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

export default RecommendationLecture;
