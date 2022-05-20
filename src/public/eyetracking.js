const eyeTrackingStartButton = document.getElementById("startBtn");
const videoEl = document.getElementById("video");

let count = 0;
let an ;
let arr = ['상단', '중앙', '하단', '좌측', '우측'];
let animal = ['캥거루', '토끼' ,'강아지', '고양이', '코알라', '고릴라', '원숭이', '고래', '낙타', '뱀', 
'물개', '쥐', '소', '말', '돼지', '거북이', '악어', '호랑이', '표범', '치타',
'늑대', '여우', '스컹크', '두더지', '돌고래', '도마뱀', '독소리', '바다표범', '가재',
'랍스타', '원앙', '까마귀', '오리', '앵무새', '부엉이', '참새', '꾀꼬리', '나비',
'잠자리', '이구아나', '카멜레온', '개미핥기', '거미', '잉어', '곰', '펭귄', '거위',
'박쥐', '병아리', '닭'];


function inputAnimal(){

    inputPrompt = prompt('동물을 입력하세요');

    //return inputPrompt;

}
eyeTrackingStartButton.addEventListener('click', async function(){
    if(count === 0){
    alert(arr[count]+"을 바라보세요",);
    document.getElementById("topWord").innerHTML=animal[(Math.floor(Math.random() * 50))];
    runInitialTest(videoEl);
   
    }
    /*
    else if(count === 1){
        alert(arr[count]+"을 바라보세요");
        document.getElementById("centerWord").innerHTML=animal[(Math.floor(Math.random() * 50))];
        runInitialTest(videoEl)
        }

    else if(count === 2){
        alert(arr[count]+"을 바라보세요");
        document.getElementById("bottomWord").innerHTML=animal[(Math.floor(Math.random() * 50))];
        runInitialTest(videoEl)
        }


    else if(count === 3){
        alert(arr[count]+"을 바라보세요");
        document.getElementById("leftWord").innerHTML=animal[(Math.floor(Math.random() * 50))];
        runInitialTest(videoEl)
        }

    
    else if(count === 4){
        alert(arr[count]+"을 바라보세요");
        document.getElementById("rightWord").innerHTML=animal[(Math.floor(Math.random() * 50))];
        runInitialTest(videoEl)
        }
    */
    count++;
}

);
function eyeTracking() {
    if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video:true})
        .then(stream=>{
          videoEl.srcObject = stream;  
        })
        .catch(err=>{
            console.log("카메라를 가져오지 못했습니다.", err)
        });
};
}

eyeTracking();







