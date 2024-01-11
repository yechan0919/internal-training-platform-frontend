import React, { useState } from 'react';
import axios from 'axios';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const VoiceChat = () => {
    // const [apiResponse, setApiResponse] = useState('');
    // const [userMessage, setUserMessage] = useState('');
    // const [chatHistory, setChatHistory] = useState([]);

    const [apiResponse, setApiResponse] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<{ type: string; message: any }[]>([]);

    const apiUrl = 'http://127.0.0.1:5001/api/text';

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();

    const callFlaskAPI = async () => {
        try {
          // API 호출
          const response = await axios.post(apiUrl, {
            message: transcript
          });

          // API 응답 결과를 state에 저장
          setApiResponse(response.data.result);

          // 대화 기록 업데이트
          setChatHistory(prevHistory => [
            ...prevHistory,
            { type: 'user', message: transcript},
            { type: 'bot', message: response.data.result }
          ]);

          // 입력 필드 초기화
          setUserMessage('');
        } catch (error) {
          console.error('API 호출 에러', error);
        }
    };

    const callAndResetAPI = () => {
        resetTranscript(); // resetTranscript 호출
        callFlaskAPI();    // callFlaskAPI 호출
      };

    if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
    }


    return (
        <div className={"w-full"}>
            <div className=" flex-1 justify-between flex flex-col h-[89vh] container mx-auto px-4 md:px-6">
                <div className="flex sm:items-center justify-between border-b-2 border-gray-200">
                    <div className="relative flex items-center space-x-4">
                        <div className="relative">
                            <span className="absolute text-green-500 right-0 bottom-0">
                            <svg width="20" height="20">
                                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                            </svg>
                            </span>
                            <img
                                src="https://newsimg-hams.hankookilbo.com/2022/08/24/185b109c-592c-4f39-a369-3adcedd79b13.jpg"
                                alt="" className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"/>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <div className="text-2xl mt-1 flex items-center">
                                <span className="text-gray-700 mr-3">Poddy</span>
                            </div>
                            <span className="text-lg text-gray-600">POSCO English Buddy</span>
                        </div>
                    </div>
                </div>

                <div id="messages" className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                    <div className="chat-message flex items-end">
                        <div className="flex flex-col space-y-2 text-base max-w-xs mx-2 order-2 items-start">
                            <span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-blue-600 text-white">Hi, I am your English buddy, Poddy!</span>
                        </div>
                        <img
                            src="https://newsimg-hams.hankookilbo.com/2022/08/24/185b109c-592c-4f39-a369-3adcedd79b13.jpg"
                            alt="My profile" className="w-6 h-6 rounded-full order-1"/>
                    </div>
                    {chatHistory.map((chat, index) => (
                        <div key={index} className={`chat-message flex ${chat.type === 'user' ? 'items-end justify-end' : 'items-end'}`}>
                        <div className={`flex flex-col space-y-2 text-base max-w-xs mx-2 ${chat.type === 'user' ? 'order-1 items-end' : 'order-2 items-start'}`}>
                            <span className={`px-4 py-2 rounded-lg inline-block ${chat.type === 'user' ? 'rounded-br-none bg-gray-300 text-gray-600' : 'rounded-bl-none bg-blue-600 text-white'}`}>{chat.message}</span>
                        </div>
                            <img
                                src={chat.type === 'user' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/1084px-Unknown_person.jpg' : 'https://newsimg-hams.hankookilbo.com/2022/08/24/185b109c-592c-4f39-a369-3adcedd79b13.jpg' }
                                alt="Profile" className={`w-6 h-6 rounded-full mx-2 ${chat.type === 'user' ? 'order-2' : 'order-1'}`}/>
                        </div>
                    ))}
                </div>

                <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
                    <div className="relative flex">
                        <span className="absolute inset-y-0 flex items-center">
                        <button
                            type="button"
                            onClick={() => SpeechRecognition.startListening({ language: 'en-US' })}
                            className={`inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 ${
                                listening ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-300 hover:bg-gray-400'
                            } focus:outline-none`}
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6 text-gray-600">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                            </svg>
                        </button>
                        </span>
                        <input type="text" placeholder="Press the button and speak!" value={transcript} onChange={(e) => setUserMessage(e.target.value)}
                            className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"/>
                        <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                            <button type="button"
                                    className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                                <span className="font-bold"
                                    onClick={callAndResetAPI}>Send</span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                        className="h-6 w-6 ml-2 transform rotate-90">
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default VoiceChat;
