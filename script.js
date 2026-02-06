document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. 추천 메뉴 레시피 데이터 (DB 대용) ---
    // 실제로는 서버에서 가져올 데이터를 여기 미리 정의합니다.
    const recipesData = {
        1: {
            title: "프레쉬 아보카도 오픈 토스트",
            mainImg: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            ingredients: ["식빵 1장", "아보카도 1/2개", "계란 1개", "크러쉬드 레드페퍼", "소금/후추"],
            steps: [
                { text: "1. 아보카도 손질하기: 껍질을 벗긴 아보카도를 얇게 슬라이스 하거나 으깨줍니다.", img: "https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
                { text: "2. 빵 굽기: 식빵을 토스터기나 프라이팬에 노릇하게 구워주세요.", img: "https://images.unsplash.com/photo-1584776296944-4531c59379af?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
                { text: "3. 토핑 올리기: 구운 빵 위에 아보카도와 취향에 따라 계란 후라이를 올린 뒤 시즈닝을 뿌려 완성!", img: "https://images.unsplash.com/photo-1525351484163-7529414395d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" }
            ]
        },
        2: {
            title: "원팬 토마토 파스타",
            mainImg: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            ingredients: ["파스타 면 1인분", "방울토마토 10개", "양파 1/4개", "마늘 5쪽", "물 500ml", "토마토 소스"],
            steps: [
                { text: "1. 재료 담기: 넓은 팬에 파스타 면, 손질한 채소, 물을 한꺼번에 다 넣습니다.", img: "https://images.unsplash.com/photo-1608219992759-8d74ed8d59bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
                { text: "2. 끓이기: 강불에서 물이 끓어오르면 8~10분간 면이 익을 때까지 저어주며 끓입니다.", img: "https://images.unsplash.com/photo-1560159752-d6d756086884?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
                { text: "3. 졸이기: 물이 자작해지면 토마토 소스를 넣고 1분간 더 볶아 마무리합니다.", img: "https://images.unsplash.com/photo-1554502078-ef0fc409efce?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" }
            ]
        },
        3: {
            title: "지중해식 칙피 샐러드",
            mainImg: "https://images.unsplash.com/photo-1512058564366-18510be2db19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            ingredients: ["병아리콩(통조림) 1컵", "오이 1/2개", "방울토마토", "올리브유", "레몬즙"],
            steps: [
                { text: "1. 재료 준비: 오이와 토마토를 먹기 좋은 한입 크기로 깍뚝썰기 합니다.", img: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
                { text: "2. 드레싱 만들기: 올리브유 2스푼, 레몬즙 1스푼, 소금, 후추를 섞어 드레싱을 만듭니다.", img: "https://images.unsplash.com/photo-1543362148-5c4d6fba5a34?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" },
                { text: "3. 버무리: 볼에 병아리콩과 채소를 넣고 드레싱과 잘 섞어주면 완성!", img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80" }
            ]
        }
    };

    // --- 2. 모달(팝업) 기능 로직 ---
    const modal = document.getElementById("recipe-modal");
    const modalBody = document.querySelector(".modal-body");
    const closeBtn = document.querySelector(".close-btn");
    const openButtons = document.querySelectorAll(".btn-open-modal");

    // '레시피 보기' 버튼 클릭 이벤트
    openButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const recipeId = e.target.getAttribute("data-id");
            const data = recipesData[recipeId];

            if (data) {
                // 모달 내용 생성 (Template Literal 사용)
                let ingredientsHtml = data.ingredients.map(ing => `<span>• ${ing}</span>`).join(" ");
                let stepsHtml = data.steps.map((step, index) => `
                    <li>
                        <div class="modal-step-text"><strong>Step ${index + 1}.</strong> ${step.text}</div>
                        <img src="${step.img}" alt="Step ${index+1}" class="modal-step-img">
                    </li>
                `).join("");

                const modalContentHtml = `
                    <div class="modal-header">
                        <img src="${data.mainImg}" alt="${data.title}">
                        <h2>${data.title}</h2>
                        <div style="margin-top:10px; color:#666;">${ingredientsHtml}</div>
                    </div>
                    <ul class="modal-steps">
                        ${stepsHtml}
                    </ul>
                `;

                modalBody.innerHTML = modalContentHtml;
                modal.style.display = "flex"; // 모달 보이기
                document.body.style.overflow = "hidden"; // 배경 스크롤 막기
            }
        });
    });

    // 닫기 버튼 클릭
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // 스크롤 풀기
    });

    // 배경 클릭 시 닫기
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });


    // --- 3. 기존 기능 (스크롤 애니메이션, 체크리스트 등) ---
    
    // 스크롤 애니메이션
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    revealElements.forEach(el => revealObserver.observe(el));

    // 헤더 스타일 변경
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    });

    // 체크리스트 기능
    const checkInputs = document.querySelectorAll('.checklist input[type="checkbox"]');
    checkInputs.forEach(input => {
        input.addEventListener('change', function() {
            const parentLabel = this.closest('.check-item');
            this.checked ? parentLabel.classList.add('completed') : parentLabel.classList.remove('completed');
        });
    });
});
