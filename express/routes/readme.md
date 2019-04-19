### index_c.js
  * 해당 파일은 router설정을 해주었습니다.
  * ('/th')의 경로로 들어오면 mongoDB의 th 데이터베이스에 접근하여 날짜, 온도, 습도 데이터를 json형식으로 반환하여 줍니다.
  * 해당 데이터는 public 폴더안의 clinet페이지 에서 데이터를 시각화 하는데 사용합니다.

### index_cr.js
  * 해당 파일은 router설정을 해주었습니다.
  * public 폴더안의 client_CR.html에서 CR(쾌적도),gender, age 데이터가 form action경로인 /cr_value로 query string형식으로 넘어옵니다.
  * query string으로 넘어온 데이터에 날짜 데이터 추가시켜 cr이라는 데이터베이스에 저장합니다.
  * 모아진 데이터는 온습도와 매칭시켜 라벨링을 하고, 머닝러닝 모델을 통해 해당 온습도에서의 쾌적한 정도를 알 수 있습니다.
  * client_CR.html에서 평가를 완료하면 페이지가 이동이되며 선택한 쾌적도 레벨을 볼 수 있게 하였습니다.


### 참고 이미지
  ![mongoDB_CR]('./express/img/mongoDB_CR.PNG')
