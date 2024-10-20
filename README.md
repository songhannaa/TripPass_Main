# ✈ 챗봇 기반의 맞춤형 여행 서비스 | TRIPPASS ✈

![Group 2](https://github.com/songhannaa/findtheshop/blob/139b3e49bb4dc9a47fd40814aba6c8d18e3aca3e/ppt/001.jpg)

<div align="center">

<b>FindTheShop</b> <br>

</div>

<br>

## \*️⃣목차

1. [📄프로젝트 소개](#project)
2. [👨‍👩‍👧‍👦팀 소개 및 역할](#team)
3. [🗓️개발 일정](#period)
4. [🔨기술 스택 ](#technology-stack)
5. [🔍기능 및 구조](#function-and-structure)
6. [♻️리팩토링](#refactoring)

<br>

## <span id="project">1. 📄프로젝트 소개</span>

- 트립패스는 사용자 개인의 여행 스타일을 파악하여 이에 맞춘 맞춤형 여행 계획을 제공합니다.
- Google Map 과 Open AI 기반의 챗봇을 통해 정확한 여행지 정보를 제공하고, 자연스러운 대화가 가능합니다.
- 또한 , 비슷한 일정과 성향을 가진 크루를 추천 받아 만날 수 있습니다.

![Group 2](https://github.com/songhannaa/findtheshop/blob/62c459f58b9b5213d1c640274164f2f1b0b26dcf/ppt/003.jpg)

<br>

## <span id="team">2. 👨‍👩‍👧‍👦팀 소개 및 역할</span>

**"농담곰 연구소"** 팀 입니다.<br/>

### 역할 분담
| **송한나** | **장다은** | 
| :---------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------: | 
| <img width="360" alt="한나" src="https://avatars.githubusercontent.com/u/131218435?v=4"> | <img width="360"  alt="다은" src="https://avatars.githubusercontent.com/u/128432201?v=4"> | 
| [songhannaa](https://github.com/songhannaa) | [absolutelydawn](https://github.com/absolutelydawn) | 
| <img src="https://img.shields.io/badge/Team Leader-7569db"/><br> - 프로젝트 기획/개발 <br> - 백엔드 / 프론트엔드 총괄 <br> - 크롤링 및 스크래핑 <br>- 상품 정보 데이터 관리| <img src="https://img.shields.io/badge/Team Member-118704"/><br> - 프로젝트 기획/개발 <br> - 크롤링 및 스크래핑 <br> - 리뷰 데이터 관리 | 


<br>

## <span id="period">3. 🗓️개발 일정</span>

![Group 2](https://github.com/songhannaa/findtheshop/blob/365f75ad4a95dfbca44b91419f32c53107570eec/ppt/005.jpg)

<br>


## <span id="technology-stack">4. ⛏️기술 스택 </span>

### 기술 스택

<table>
	<tr>
		<td align="center" width="100px">사용 기술</td>
		<td width="800px">
		<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">&nbsp
		<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">&nbsp
		<img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">&nbsp
		</td>
	</tr>
	<tr>
		<td align="center">패키지</td>
		<td>
			<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=NPM&logoColor=ffffff"/>&nbsp
		</td>
	</tr>
	<tr>
		<td align="center">언어</td>
		<td>
		<img src="https://img.shields.io/badge/python-3776AB?style=for-the-badge&logo=python&logoColor=white">&nbsp
		<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
		</td>
	</tr>
	<tr>
		<td align="center">협업</td>
		<td>
			<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp
			<img src="https://img.shields.io/badge/Notion-5a5d69?style=for-the-badge&logo=Notion&logoColor=white"/>&nbsp
		</td>
	<tr> 
		<td align="center">디자인</td>
		<td>
			<img src="https://img.shields.io/badge/Figma-d90f42?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp
		</td> 
	</tr> 
	<tr>
		<td align="center">IDE</td>
		<td>
		<img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp
	</tr>
</table>

<br>

## <span id="function-and-structure">5. 🔍프로젝트 구조 및 기능</span>

### 📁프로젝트 구조
![Group 2](https://github.com/songhannaa/findtheshop/blob/cf88235544bdfeb41aa24682885ff107884803e4/ppt/008.jpg)


### 📁프로젝트 주요 기능

1. **메인 페이지** <br>
    - 사용자가 검색어를 입력하면 검색 페이지로 리디렉션됩니다.<br>
2. **검색 페이지**:<br>
    - 검색어가 네이버 API로 전송됩니다.<br>
    - 네이버 API는 항목 목록(최대 100개)을 반환하고, 이 항목들이 검색 페이지에 표시됩니다.<br>
3. **제품 선택**:<br>
    - 사용자가 검색 페이지에서 항목을 클릭하면, 아파치 서버가 **`productId`**를 검색합니다.<br>
    - 그런 다음 **`productId`**가 Node.js 서비스로 전달되어 FastAPI 서비스에 요청됩니다.<br>
4. **데이터베이스 조회**:<br>
    - FastAPI는 MySQL 데이터베이스에서 **`productId`**를 조회합니다.<br>
    - 찾을 경우, FastAPI는 MongoDB에서 **`productId`**에 대한 리뷰 데이터를 검색하여 Node.js로 반환하고, 이는 다시 아파치 서버로 전달되어 표시됩니다.<br>
    - 찾지 못할 경우, FastAPI는 **`scraping_reviews.py`**를 트리거하여 리뷰를 수집하고 MongoDB에 저장합니다. 그 후 리뷰 데이터가 검색되어 표시되고, 해당 제품이 "최근 검색 상품" 탭에 추가됩니다.<br>
5. **최근 검색 탭**:<br>
    - "최근 검색 상품" 탭의 제품은 메인 페이지에서 접근할 수 있습니다.<br>
6. **제품 삭제**:<br>
    - 삭제 작업이 시작되면, **`productId`**가 MySQL에서 삭제되고 관련 리뷰 데이터는 MongoDB에서 제거됩니다.<br>

