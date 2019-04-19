# 클라이언트 페이지

### plotly_c.html(실시간 그래프)
  - 포트포워딩 된 IP로 socket으로부터 받은 날짜,온도,습도,상관계수 데이터를 실시간으로 처리하여 데이터 시각화를 하였습니다.
  - 상관계수 값은 10개 단위로 Sliding window방식으로 보여지며 데이터가 10개가 모인 시점부터 값이 나옵니다.
  - 그래프에서 전 데이터 값 과 같은 데이터 값 이면 갱신하지 않게 하였습니다.

### client_DB_c.html(DB 데이터 시각화)
  - mongoDB의 th 데이터베이스로부터 json 형식으로 날짜,온도,습도를 받아옵니다.
  - 받은 온,습도로 상관계수 계산을 해줍니다. 상관계수값은 10개씩 Block 방식으로 처리했습니다.
  - 각각의 데이터의 변화를 자세하게 보기위해서 그래프를 각각 그려주었습니다.
  - 원하는 시간구간 별로 볼 수 있게 하기위해 rangeslider와 버튼을 추가 하였습니다.

### client_CR.html(쾌적도 평가)
  - 쾌적도 평가 페이지 입니다.
  - 게이지로 현재 온도와 습도를 실시간으로 볼 수 있게 하였습니다.
  - 5단계의 쾌적도를 평가하고, 성별과, 나이대를 같이 조사하였습니다, 쾌적도의 평가값은 숫자가 높을수록 쾌적합니다. 
  - form의 action을 사용하여 get method, 쿼리 스트링으로 데이터를 전송하게 하였습니다.
  - 제출 버튼을 누르면 ('/cr_value')경로로 데이터가 전송되며 index_cr.js에서 데이터를 받아서 처리합니다
  - 전송되는 동시에 평가자에게는 자신이 선택한 쾌적도 평가값을 보여줍니다.


### 참고이미지 
### plotly_c.html
 ![plotly_c](/express/img/correlation.png)
 
### client_DB_c.html
 ![client_DB_c](/express/img/MongoDB_Client_Data.png)
 
### client_CR.html
 ![client_CR](/express/img/client_CR.png)
 ![client_CR_result](/express/img/client_result_page.png)
