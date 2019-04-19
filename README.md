# Raspberry-Pi_DHT22_Weather_Station_with_correlation and ML

### 기존에 라즈베리파이(3 B+)를 사용하여 진행하였던 프로젝트를 응용한 프로젝트 입니다.
  * 최종적으로 AI를 활용하여 특정한 온,습도에서 쾌적함의 정도를 판단하였습니다. 
  
  * 각각의 내용은 폴더로 나뉘어서 설명이 되어있습니다.
  * 모든 address는 포트포워딩을 통해 외부에서 여러기기가 동시에 접속 할수 있게 하였습니다.
  * flask(5000), socket.io(3000), express(3030) 총 3개의 서버를 사용하였고 동시에 running됩니다.
  * 데이터를 주고받기위해 CORS 설정을 해주어 문제없이 작동 되게 하였습니다.
  
### 사용한 도구, 언어 및 기술
  * Editor
    - Brackets
  * 도구
    - Raspberry Pi3 B+, DHT22
  * Front-End
    - HTML5, javascript, plotly.js, gauge.js
  * Back-End
    - Python3(Flask), node.js, express, socket.io
  * Module and Library
    -  Python3(DHT22 library), mongoose, cheerio, cors
  * DB
    - MongoDB
  
### 각 폴더의 간단한 설명
  * data mining folder
     - python 라이브러리인 pandas를 사용하여 데이터를 분석하였습니다.
    
  * express folder
    - express-generator를 사용하여 진행하였습니다.
    - Pearson correlation를 사용하여 온,습도의 상관관계를 분석하였습니다.
    
  * flask folder
    - 라즈베리파이의 GPIO핀과 파이썬을 이용하여 DHT22센서 데이터를 받았습니다.
    - 파이썬의 Flask를 사용하여 동적 html웹 페이지(2초마다 데이터 갱신)를 생성하였습니다.
  
  * scrape_Data
    - 동적 웹페이지로부터 온,습도를 scraping 하여 데이터를 mongodb에 저장하고 correlation을 계산하여 socket으로 전송해주었습니다.
    
  * Raspberry Pi setting & install.txt
    - 라즈베리파이에 대한 초기설정과 각종 언어 및 기술의 설치 방법등이 적혀있습니다.
    
  ### 참고 이미지 
  
   ![correlation](/img/correlation_relation.png)
    
   ![DHT22 Pin](/img/dht22.png)
  
   ![GPIO Pin Map](/img/GPIO.png)
