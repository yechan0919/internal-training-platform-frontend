import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Lecture from "../models/Lecture";
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

interface VideoListForMyLectureProps {
  category: string,
  lectures: Lecture[],
  onDeleteLecture: (lectureId: number) => void; // Add this prop
}

const VideoListForMyLecture: React.FC<VideoListForMyLectureProps> = ({ category, lectures, onDeleteLecture  }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const pagesToShow = 10;
  const maxPageDisplay = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = lectures.slice(indexOfFirstItem, indexOfLastItem);

  const lastPage = Math.ceil(lectures.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPage = Math.min(lastPage, maxPageDisplay);

    const halfPagesToShow = Math.floor(pagesToShow / 2);
    let startPage = Math.max(currentPage - halfPagesToShow, 1);
    let endPage = Math.min(startPage + pagesToShow - 1, lastPage);

    if (endPage - startPage + 1 < pagesToShow) {
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <div
          key={i}
          onClick={() => paginate(i)}
          className={`cursor-pointer -ml-px relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
            currentPage === i
              ? 'bg-blue-500 text-white hover:bg-blue-700 focus:z-10 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200 active:bg-blue-800'
              : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-100 transition ease-in-out duration-150'
          }`}
        >
          {i}
        </div>
      );
    }

    return pageNumbers;
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= lastPage) {
      setCurrentPage(pageNumber);
    }
  };

  const handleDeleteLecture = (lectureId: number) => {

    Swal.fire({
      title: '정말로 삭제하시겠습니까?',
      text: '해당 강의는 내 강의실에서 사라집니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const userId = "abc"; // Replace with actual user ID
        const userMyLectureRequest = {
          userId: userId,
          lectureId: lectureId,
        };

        fetch(process.env.REACT_APP_API_URL + `/lecture/delete-mylecture`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userMyLectureRequest),
        })
          .then(response => {
            onDeleteLecture(lectureId);

            if (response.ok) {
              Swal.fire({
                icon: "success",
                title: "강의가 삭제되었습니다.",
                showConfirmButton: false,
                timer: 1500
              });
              // Implement logic to refresh the list or update state if needed
            } else {
              Swal.fire({
                icon: "error",
                title: "삭제 중 오류가 발생했습니다.",
                showConfirmButton: false,
                timer: 1500
              });
            }
          })
          .catch(error => {
            console.error('Error deleting lecture from My Lectures:', error);
            Swal.fire({
              icon: "error",
              title: "삭제 중 오류가 발생했습니다.",
              showConfirmButton: false,
              timer: 1500
            });
          });
        }
      });
  };
  

  return (
    <div className={'mb-4'}>
      {lectures.length > 0 &&
        <>
          <h2 className="text-3xl font-bold py-2 border-b border-gray-800">{category}</h2>
          <ul role="list" className="divide-y divide-gray-100">
            {currentItems.map((lecture) => (
              <li key={lecture.lectureId} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={lecture.thumbnail_url} alt="" />
                  <div className="min-w-0 flex-auto">
                    <Link to={`/video/${lecture.lectureId}`} state={lecture}>
                      <p className="text-sm font-semibold leading-6 text-gray-900">{lecture.title}</p>
                    </Link>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{lecture.description}</p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{lecture.channel_name}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Published At: {lecture.published_date.toLocaleString().split('T')[0]}
                  </p>
                  <button
                    onClick={() => handleDeleteLecture(lecture.lectureId)}
                    className="mt-2 text-xs font-medium text-red-600 cursor-pointer focus:outline-none"
                  >
                   
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4">
            <nav className="inline-flex rounded-md shadow-sm">
              <div
                onClick={() => paginate(currentPage - 1)}
                className={`cursor-pointer relative inline-flex items-center px-2 py-2 rounded-l-md border text-sm font-medium ${
                  currentPage === 1
                    ? 'bg-gray-300 text-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-100 transition ease-in-out duration-150'
                }`}
              >
                Previous
              </div>
              {renderPageNumbers()}
              <div
                onClick={() => paginate(currentPage + 1)}
                className={`cursor-pointer relative inline-flex items-center px-2 py-2 rounded-r-md border text-sm font-medium ${
                  currentPage === lastPage
                    ? 'bg-gray-300 text-gray-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:bg-gray-100 transition ease-in-out duration-150'
                }`}
              >
                Next
              </div>
            </nav>
          </div>
        </>
      }
    </div>
  );
};

export default VideoListForMyLecture;
