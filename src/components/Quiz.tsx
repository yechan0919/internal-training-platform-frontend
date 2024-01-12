import React, { useState } from 'react';
import request from "../api/axiosAPI";
import {useAuthStore} from "../store/auth";

const Quiz: React.FC = () => {
    const { user } = useAuthStore();
    const [quizData, setQuizData] = useState<any>(null);
    const [pointData, setPointData] = useState<any>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

    // OX 버튼 클릭
    const selectOX = (value: string) => {
        setSelectedValue(value);
    };

    // 토픽 버튼 클릭
    const selectTopic = (topic: string) => {
        callQuizApi(topic);
        setSelectedTopic(topic);
    };

    // 토픽 버튼 스타일
    const buttonStyle = {
        base: 'rounded-md bg-indigo-400 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
        selected: 'rounded-md bg-indigo-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm',
      };

    // 정답 확인 버튼 클릭
    const checkAnswer = (selectedValue: string, topic: string) => {
        if (selectedValue === `${quizData.answer}`) {
            selectOX('정답'); // 확인용
            if(user){
                callPointUpApi(user.userId, `${quizData.topic}`)
                if (pointData && pointData.is_lvup === 1) {
                    alert(`정답입니다!\n축하합니다! 레벨${pointData.user_lv === 1 ? '2로' : '3으로'} 상승하였습니다!`)
                }
                else {
                    alert('정답입니다!');
                }
            }
            selectTopic(`${quizData.topic}`);

        }
        else {
            selectOX('오답');
            selectTopic(`${quizData.topic}`);
            alert('틀렸습니다...');
        }
    };

    // 포인트 증가
    const callPointUpApi = async (userId: string, topic: string) => {
        try {
            request.put('/point/add-point', {
                "userId": userId,
                "topic": topic,
            }).then((response) => {
                // 응답 확인
                if (response.status === 200) {
                    // 성공적으로 받아온 경우
                    const data = response.data;
                    setPointData(response.data);
                } else {
                    // 오류가 발생한 경우
                    console.error(`API 호출 중 오류 발생: ${response.status}`);
                }
            })
          } catch (error) {
            console.error('API 호출 중 에러:', error);
          }
    };

    // 퀴즈 API 호출
    const callQuizApi = async (category: string) => {
        try {
          request.get(`/quiz/${category}/topic-random-quiz`)
              .then((res) => {
                  if (res.status === 200) {
                      setQuizData(res.data);
                  } else {
                      // 오류가 발생한 경우
                      if (res.status === 403) {
                          alert('접근 권한이 없습니다.');
                      } else {
                          console.error(`API 호출 중 오류 발생: ${res.status}`);
                      }
                      window.location.href = '/';
                  }
              })
        } catch (error) {
          console.error('API 호출 중 에러:', error);
          // window.location.href = '/';
        }
    };

    return (
        <>
            <div className="relative isolate px-6 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                    </div>
                    <div className="mx-auto max-w-2xl pt-10">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Quiz
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                아래의 버튼을 눌러 분야 별 퀴즈를 풀어보세요!
                            </p>
                            <div className="mt-5 mb-7 flex items-center justify-center gap-x-6">
                                <button
                                    className={selectedTopic === '언어' ? buttonStyle.selected : buttonStyle.base}
                                    onClick={() => selectTopic('언어')}
                                >
                                    언어
                                </button>
                                <button
                                    className={selectedTopic === '생산기술' ? buttonStyle.selected : buttonStyle.base}
                                    onClick={() => selectTopic('생산기술')}
                                >
                                    생산기술
                                </button>
                                <button
                                    className={selectedTopic === '재무' ? buttonStyle.selected : buttonStyle.base}
                                    onClick={() => selectTopic('재무')}
                                >
                                    재무
                                </button>
                                <button
                                    className={selectedTopic === '마케팅' ? buttonStyle.selected : buttonStyle.base}
                                    onClick={() => selectTopic('마케팅')}
                                >
                                    마케팅
                                </button>
                                <button
                                    className={selectedTopic === 'IT' ? buttonStyle.selected : buttonStyle.base}
                                    onClick={() => selectTopic('IT')}
                                >
                                    IT
                                </button>
                            </div>
                            <div>
                                {quizData && (
                                    <p className="font-bold mt-10 mb-7 text-gray-900 sm:text-4xl">
                                        {quizData.question}
                                    </p>
                                )}
                                <div>
                                    {quizData && (
                                        <button
                                            className={`w-80 h-80 rounded-md ${selectedValue === 'o' ? 'bg-pink-400' : 'bg-gray-200'} px-3.5 py-3.5 mr-4 text-9xl font-bold text-black shadow-sm hover:bg-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200`}
                                            onClick={() => selectOX('o')}
                                            disabled={selectedValue === 'o'}
                                        >
                                            O
                                        </button>
                                    )}
                                    {quizData && (
                                        <button
                                            className={`w-80 h-80 rounded-md ${selectedValue === 'x' ? 'bg-pink-400' : 'bg-gray-200'} px-3.5 py-3.5 text-9xl font-bold text-black shadow-sm hover:bg-pink-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-200`}
                                            onClick={() => selectOX('x')}
                                            disabled={selectedValue === 'x'}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                                <div>
                                    {quizData && (
                                        <button
                                            className="rounded-md bg-indigo-400 px-3.5 py-3.5 mt-5 text-base font-bold text-white hover:bg-indigo-500 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                            onClick={() => checkAnswer(`${selectedValue}`, `${quizData.topic}`)}>
                                            정답 확인
                                        </button>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1160/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
                <div style={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    width: '260px',
                    height: '230px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '1rem',
                    color: '#666666',
                    textAlign: 'center',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
                }}>
                    <span className="font-bold text-lg">Level</span>
                    <span className="block mt-3">5 포인트 미만 <span className="font-bold text-lg text-green-400 ml-3">lv.0</span> </span>
                    <span className="block mt-3">5 포인트 이상 <span className="font-bold text-lg text-yellow-500 ml-3">lv.1</span> </span>
                    <span className="block mt-3">10 포인트 이상 <span className="font-bold text-lg text-orange-500 ml-3">lv.2</span> </span>
                    <span className="block mt-3">15 포인트 이상 <span className="font-bold text-lg text-red-600 ml-3">lv.3</span></span>
            </div>
        </>
    );
};

export default Quiz;
