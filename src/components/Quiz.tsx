import React, { useState } from 'react';

const Quiz: React.FC = () => {
    const [quizData, setQuizData] = useState<any>(null);
    const [pointData, setPointData] = useState<any>(null);
    const [selectedValue, setSelectedValue] = useState<string | null>(null);

    // OX 버튼 클릭
    const selectOX = (value: string) => {
        setSelectedValue(value);
    };

    // 토픽 버튼 클릭
    const selectTopic = (topic: string) => {
        selectOX('');
        callQuizApi(topic);
    };

    // 정답 확인
    const checkAnswer = (selectedValue: string, topic: string) => {
        if (selectedValue === `${quizData.answer}`) {
            selectOX('정답'); // 확인용
            //callPointApi(userId, topic); // 포인트 증가
        }
        else {
            selectOX('오답');
        }
    };

    // 포인트 증가
    // const callPointUpApi = async (userId: string, topic: string) => {
    const callPointApi = async (topic: string) => {
        try {
            // API 엔드포인트 및 IP 주소
            const baseUrl = 'http://192.168.0.104:8080';
            const apiEndpoint = '/point/add-point';

            // 요청 데이터
            const requestData = {
                // userId: userId,
                topic: topic,
            };

            // REST API 호출
            const response = await fetch(`${process.env.REACT_APP_API_URL}${apiEndpoint}`, {
                method: 'POST', // POST 요청 사용
                headers: {
                  'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
                },
                body: JSON.stringify(requestData), // 데이터를 문자열로 변환하여 전송
            });

            // 응답 확인
            if (response.ok) {
              // 성공적으로 받아온 경우
              const data = await response.json();
              setPointData(data);
            } else {
              // 오류가 발생한 경우
              console.error(`API 호출 중 오류 발생: ${response.status}`);
            }
          } catch (error) {
            console.error('API 호출 중 에러:', error);
          }
    };

    // 퀴즈 API 호출
    const callQuizApi = async (category: string) => {
        try {
          // API 엔드포인트 및 IP 주소
          const apiEndpoint = `/quiz/${category}/topic-random-quiz`;

          // REST API 호출
          const response = await fetch(`${process.env.REACT_APP_API_URL}${apiEndpoint}`,{
              method: 'GET', // GET 요청 사용
              headers: {
                  'Content-Type': 'application/json',
                  Authorization : `Bearer ${localStorage.getItem('accessToken')}`, // JWT 토큰 추가
              }
          });

          // 응답 확인
          if (response.ok) {
            // 성공적으로 받아온 경우
            const data = await response.json();
            setQuizData(data);
          } else {
            // 오류가 발생한 경우
            console.error(`API 호출 중 오류 발생: ${response.status}`);
           window.location.href = '/';
          }
        } catch (error) {
          console.error('API 호출 중 에러:', error);
          window.location.href = '/';
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
                <div className="mx-auto max-w-2xl pt-32 sm:pt-48 lg:pt-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Quiz
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            아래의 버튼을 눌러 분야 별 퀴즈를 풀어보세요!
                        </p>
                        <div className="mt-5 mb-7 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => selectTopic("언어")}
                            >
                                언어
                            </a>
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => selectTopic("생산기술")}
                            >
                                생산기술
                            </a>
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => selectTopic("재무")}
                            >
                                재무
                            </a>
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => selectTopic("마케팅")}
                            >
                                마케팅
                            </a>
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => selectTopic("IT")}
                            >
                                IT
                            </a>
                        </div>
                        <div>
                            {quizData && (
                                <p className="font-bold mt-10 mb-7 text-gray-900 sm:text-4xl">
                                    {quizData.question}
                                </p>
                            )}
                            <div>
                                <button
                                    className="w-80 h-80 rounded-md bg-gray-200 px-3.5 py-3.5 pr-8 mr-4 text-9xl font-bold text-black shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                                    onClick={() => selectOX('o')}
                                    disabled={selectedValue === 'o'}>
                                O
                                </button>
                                <button
                                    className="w-80 h-80 rounded-md bg-gray-200 px-3.5 py-3.5 text-9xl font-bold text-black shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-400"
                                    onClick={() => selectOX('x')} disabled={selectedValue === 'x'}>
                                X
                                </button>
                            </div>

                            <button
                                    className="rounded-md bg-indigo-300 px-3.5 py-3.5 mt-5 text-base font-bold text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
                                    onClick={() => checkAnswer(`${selectedValue}`, `${quizData.topic}`)}>
                                정답 확인
                            </button>

                            <div>
                                <p>선택된 값: {selectedValue}</p>
                            </div>

                        </div>
                    </div>
                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </>
    );
};

export default Quiz;
