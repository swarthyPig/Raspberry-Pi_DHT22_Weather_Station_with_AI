# index_scrape_c.js

* flask로 생성한 동적 웹페이지에서 cheerio를 사용하여 온,습도 데이터를 3초마다 스크리핑 합니다.
* 스크리핑한 온습도 데이터와 날짜 데이터를 mongoDB에 저장합니다. 저장 장소는 iot DB안의 ths collections 입니다.
* 온습도 사이의 상관계수를 구합니다.
* socket을 사용하여 날짜, 온도, 습도, 상관계수를 emit 해줍니다
* 이 모든 작업은 3초마다 실시간으로 데이터가 갱신되며 이루어집니다.
* promise 와 async await를 사용하여 비동기 처리를 해주었습니다.

* 상관계수는 데이터 10개씩 sliding Window 방식으로 계산하였습니다. 따라서 데이터가 10개가 모이기 전까지는 상관계수가 나오지 않습니다. 
* DB에 일정시간 동안 같은 온도가 동일하게 저장되어 있는 부분 때문에 상관계수를 계산할때 분모가 0이되면서 결과값이 inf로 나오는 부분을 
  온도 데이터의 끝에 약간의 noise 값을 추가하여 정상적으로 계산되게 하였습니다.
  
### 참고 이미지
  ![Correlation data](/scrape_Data/img/Correlation_data.png)
