# Raspberry-Pi DHT22 Weather Station with AI

## 개발 동기
  * 특정 온습도에서의 불쾌지수는 정해진 값에 의해 결정됩니다. 하지만 실제로 특정 온습도에서 느끼는 쾌적도는 사람마다 주관적이므로 상이합니다. 
    이번 프로젝트는 지정된 장소에 온습도 센서를 설치하고 사용자의 쾌적도 평가를 각자 소지하고있는 스마트폰으로 입력받아 데이터를 구성, 마이닝, 정제
    하여 머신러닝 모델을 만들고 그것을 통해 쾌적도값을 도출해내었습니다. 이러한 쾌적도값을 실시간으로 모니터링 할 수 있게 시각화 하였습니다.

## 프로젝트 요약
  * AI를 활용하여 특정한 온,습도에서 쾌적함의 정도를 판단하였습니다. 
  * 각각의 내용은 폴더로 나뉘어서 설명이 되어있습니다.
  * 모든 address는 포트포워딩을 통해 외부에서 여러기기가 동시에 접속 할 수 있게 하였습니다.
  * flask(5000), socket.io(3000), express(3030) 총 3개의 서버를 사용하였고 동시에 running됩니다.
  * 데이터를 주고받기위해 CORS 설정을 해주어 문제없이 작동 되게 하였습니다.
  
## 프로젝트 사용법
  1. 라즈베리파이에 연결된 온습도 센서에서 나오는 데이터 값을 실시간 동적 웹페이지를 구동합니다. 
     - -> /flask/app.py 실행
  2. 웹 페이지의 온습도를 실시간으로 스크래핑하여 머신러닝 모델에 적용합니다. 추가로 DB에 저장합니다. 
     - -> /scrape_Data/index_scrape_c_ml.js 실행
  3. express-generator 를 사용하여 서버를 구동하고 실시간 클라이언트 페이지 등등을 볼 수 있습니다. 
     - -> /express/app.js 실행
  4. 추가로 /express/public 에서 각종 실시간 모니터링을 볼 수 있습니다.
  
## 프로젝트 맵
  ![map](/img/map.PNG)
  
## 사용한 도구, 언어 및 기술
  * Editor
    - VScode, Google Colab
  * 도구
    - Raspberry-Pi 3 B+, DHT22 sensor
  * Front-End
    - HTML5, javascript, plotly.js, gauge.js
  * Back-End
    - Python3(Flask), node.js, express, socket.io
  * Module and Library
    -  Python3(DHT22 library), mongoose, cheerio, cors
  * Data mining
    - Python(Pandas)
  * DB
    - MongoDB
  
## 각 폴더별 간단한 설명
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
    
  * machine learning folder
    - 프로젝트에서 사용한 머신러닝 모델과 데이터파일입니다. 각각 tensorflow, sk-learn, keras를 사용하여 모델을 제작하였습니다.
    
  * Raspberry Pi setting & install.txt
    - 라즈베리파이에 대한 초기설정과 각종 언어 및 기술의 설치 방법등이 적혀있습니다.
    
## 최종 결과 화면

   ![client](/img/client_DB_c_cr.PNG)
   ![plotly](/img/plotly_ml.PNG)
    
## 참고 파일
   프로젝트 발표용 PPT에서 각종 화면(실행,콘솔)과 코드를 볼 수 있습니다.
   
   발표용 PPT | [클릭](/발표용PPT.pdf)
    
    
## 참고 이미지 
  
   ![correlation](/img/correlation_relation.png)
    
   ![DHT22 Pin](/img/dht22.png)
  
   ![GPIO Pin Map](/img/GPIO.png)
