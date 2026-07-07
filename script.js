// 生成30x30网格
function generateGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    
    // 生成900个格子
    for (let i = 0; i < 900; i++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.index = i;
        gridContainer.appendChild(cell);
    }
}

// 计算从生日到现在的月数
function calculateMonthsPassed(birthday) {
    const birthDate = new Date(birthday);
    const now = new Date();
    
    // 计算年差和月差
    let monthsPassed = (now.getFullYear() - birthDate.getFullYear()) * 12;
    monthsPassed += now.getMonth() - birthDate.getMonth();
    
    // 如果今天还没过生日当天，减去1个月
    if (now.getDate() < birthDate.getDate()) {
        monthsPassed--;
    }
    
    return Math.max(0, monthsPassed);
}

// 更新网格状态
function updateGrid(monthsPassed) {
    const cells = document.querySelectorAll('.grid-cell');
    
    cells.forEach((cell, index) => {
        if (index < monthsPassed) {
            cell.className = 'grid-cell past';
        } else if (index === monthsPassed) {
            cell.className = 'grid-cell present';
        } else {
            cell.className = 'grid-cell';
        }
    });
}

// 处理表单提交
function handleFormSubmit(e) {
    e.preventDefault();
    
    const birthday = document.getElementById('birthday').value;
    const monthsPassed = calculateMonthsPassed(birthday);
    
    updateGrid(monthsPassed);
    
    // 保存生日到本地存储
    localStorage.setItem('birthday', birthday);
    
    // 全屏显示网格
    showFullscreenGrid();
}

// 全屏显示网格
function showFullscreenGrid() {
    // 添加全屏类到body
    document.body.classList.add('fullscreen');
    
    // 创建返回按钮
    const backButton = document.createElement('button');
    backButton.textContent = '返回';
    backButton.className = 'back-btn';
    backButton.onclick = hideFullscreenGrid;
    document.body.appendChild(backButton);
}

// 退出全屏显示
function hideFullscreenGrid() {
    // 移除全屏类
    document.body.classList.remove('fullscreen');
    
    // 移除返回按钮
    const backButton = document.querySelector('.back-btn');
    if (backButton) {
        backButton.remove();
    }
}

// 初始化函数
function init() {
    // 生成初始网格
    generateGrid();
    
    // 添加表单提交事件监听
    const form = document.getElementById('birthday-form');
    form.addEventListener('submit', handleFormSubmit);
    
    // 检查本地存储是否有保存的生日
    const savedBirthday = localStorage.getItem('birthday');
    if (savedBirthday) {
        document.getElementById('birthday').value = savedBirthday;
        const monthsPassed = calculateMonthsPassed(savedBirthday);
        updateGrid(monthsPassed);
    }
}

// 添加格子悬停效果
function addCellHoverEffects() {
    const cells = document.querySelectorAll('.grid-cell');
    
    cells.forEach((cell, index) => {
        cell.addEventListener('mouseenter', () => {
            // 显示格子对应的年龄和月份信息
            const years = Math.floor(index / 12);
            const months = index % 12;
            cell.title = `${years}岁${months}个月`;
        });
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    init();
    // 等网格生成后添加悬停效果
    setTimeout(addCellHoverEffects, 100);
});

// 监听窗口大小变化，重新添加悬停效果
window.addEventListener('resize', () => {
    addCellHoverEffects();
});