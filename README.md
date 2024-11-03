# ✈ 챗봇 기반의 맞춤형 여행 서비스 | TRIPPASS ✈

![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0001.png)

<div align="center">

<b>TRIPPASS</b> <br>

</div>

<br>

## \*️⃣목차

1. [📄프로젝트 소개](#project)
2. [👨‍👩‍👧‍👦팀 소개 및 역할](#team)
3. [🗓️개발 일정](#period)
4. [🔨기술 스택 ](#technology-stack)
5. [🔍기능 및 아키텍쳐](#function-and-structure)

<br>

## <span id="project">1. 📄프로젝트 소개</span>

- 트립패스는 사용자 개인의 여행 스타일을 파악하여 이에 맞춘 맞춤형 여행 계획을 제공합니다.
- Google Map 과 Open AI 기반의 챗봇을 통해 정확한 여행지 정보를 제공하고, 자연스러운 대화가 가능합니다.
- 또한 , 비슷한 일정과 성향을 가진 크루를 추천 받아 만날 수 있습니다.

![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0005.png)

<br>

## <span id="team">2. 👨‍👩‍👧‍👦팀 소개 및 역할</span>

**"T라노사우르스"** 팀 입니다.<br/>

![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0002.png)

<br>

## <span id="period">3. 🗓️개발 일정</span>

![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0015.png)

<br>


## <span id="technology-stack">4. ⛏️기술 스택 </span>

### 기술 스택

<table>
	<tr>
		<td align="center" width="100px">사용 기술</td>
		<td width="800px">
		<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">&nbsp
		<img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">&nbsp
		<img src="https://img.shields.io/badge/aws-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white">&nbsp;
		<img src="https://img.shields.io/badge/docker-257bd6?style=for-the-badge&logo=docker&logoColor=white">&nbsp;
  		<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=Kubernetes&logoColor=white">&nbsp;
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

## <span id="function-and-structure">5. 🔍프로젝트 구조 및 기능</span>

### 📁프로젝트 아키텍쳐
![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0012.png)


### 📁프로젝트 주요 기능
1. openAI 챗봇을 통한 여행 계획 생성
   - 사용자의 발화 의도를 파악한 함수콜링 기법을 사용하여 회원 성향에 맞는 여행 계획을 추천합니다.
	![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0012.png)

2. 임베딩을 통한 정보 업데이트
   - 사용자의 여행 정보를 임베딩하고 입력한 문장에 맞는 유사도를 찾아 일정을 업데이트 합니다.
   	![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0015.png)
3. serpAPI를 사용한 정확한 정보 제공
   - openAI 할루시네이션 현상을 해결하기 위해 Goolgle Map 기반의 정보를 제공합니다.
   - 최신의 여행지 및 관광지 정보를 제공합니다. 
        ![Group 2](https://github.com/songhannaa/TripPass_Main/blob/main/pdf/0022.png)
