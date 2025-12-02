// ==================== GAME STATE ====================
const gameState = {
    playerName: 'Player',
    gameMode: 'classic',
    difficulty: 'medium',
    tournamentRounds: 3,
    currentRound: 0,
    scores: {
        player: 0,
        computer: 0,
        draws: 0
    },
    currentStreak: 0,
    bestStreak: 0,
    worstStreak: 0,
    history: [],
    playerChoices: {},
    computerChoices: {},
    soundEnabled: true,
    theme: 'light',
    playerHistory: [] // For AI learning
};

// ==================== GAME RULES ====================
const gameRules = {
    classic: {
        rock: ['scissors'],
        paper: ['rock'],
        scissors: ['paper']
    },
    extended: {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['paper', 'spock'],
        spock: ['rock', 'scissors']
    }
};

// Choice icons mapping
const choiceIcons = {
    rock: 'fa-hand-rock',
    paper: 'fa-hand-paper',
    scissors: 'fa-hand-scissors',
    lizard: 'fa-hand-lizard',
    spock: 'fa-hand-spock'
};

// ==================== DOM ELEMENTS ====================
const elements = {
    // Buttons
    themeToggle: document.getElementById('themeToggle'),
    soundToggle: document.getElementById('soundToggle'),
    saveNameBtn: document.getElementById('saveNameBtn'),
    resetBtn: document.getElementById('resetBtn'),
    rulesBtn: document.getElementById('rulesBtn'),
    statsBtn: document.getElementById('statsBtn'),
    historyBtn: document.getElementById('historyBtn'),
    
    // Input
    playerNameInput: document.getElementById('playerName'),
    
    // Display
    playerDisplayName: document.getElementById('playerDisplayName'),
    playerScore: document.getElementById('playerScore'),
    computerScore: document.getElementById('computerScore'),
    drawScore: document.getElementById('drawScore'),
    currentStreak: document.getElementById('currentStreak'),
    roundNumber: document.getElementById('roundNumber'),
    difficultyDisplay: document.getElementById('difficultyDisplay'),
    
    // Game Arena
    playerChoiceIcon: document.getElementById('playerChoiceIcon'),
    playerChoiceText: document.getElementById('playerChoiceText'),
    computerChoiceIcon: document.getElementById('computerChoiceIcon'),
    computerChoiceText: document.getElementById('computerChoiceText'),
    resultMessage: document.getElementById('resultMessage'),
    
    // Choices
    choicesSection: document.getElementById('choicesSection'),
    
    // Quick Stats
    winRate: document.getElementById('winRate'),
    bestStreak: document.getElementById('bestStreak'),
    totalGames: document.getElementById('totalGames'),
    
    // Modals
    rulesModal: document.getElementById('rulesModal'),
    statsModal: document.getElementById('statsModal'),
    historyModal: document.getElementById('historyModal'),
    
    // Tournament
    tournamentSettings: document.getElementById('tournamentSettings'),
    
    // Canvas
    confettiCanvas: document.getElementById('confetti')
};

// ==================== INITIALIZATION ====================
function init() {
    loadGameState();
    setupEventListeners();
    updateDisplay();
    updateQuickStats();
    
    // Set player name from saved state
    if (gameState.playerName !== 'Player') {
        elements.playerNameInput.value = gameState.playerName;
        elements.playerDisplayName.textContent = gameState.playerName;
    }
    
    // Apply saved theme
    if (gameState.theme === 'dark') {
        document.body.classList.add('dark-theme');
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Apply sound state
    if (!gameState.soundEnabled) {
        elements.soundToggle.classList.add('muted');
        elements.soundToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
}

// ==================== EVENT LISTENERS ====================
function setupEventListeners() {
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Sound toggle
    elements.soundToggle.addEventListener('click', toggleSound);
    
    // Save player name
    elements.saveNameBtn.addEventListener('click', savePlayerName);
    elements.playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') savePlayerName();
    });
    
    // Game mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', () => selectGameMode(btn.dataset.mode));
    });
    
    // Difficulty buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => selectDifficulty(btn.dataset.difficulty));
    });
    
    // Tournament buttons
    document.querySelectorAll('.tournament-btn').forEach(btn => {
        btn.addEventListener('click', () => selectTournamentRounds(btn.dataset.rounds));
    });
    
    // Choice buttons
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', () => makeChoice(btn.dataset.choice));
    });
    
    // Action buttons
    elements.resetBtn.addEventListener('click', resetGame);
    elements.rulesBtn.addEventListener('click', () => openModal('rulesModal'));
    elements.statsBtn.addEventListener('click', openStatsModal);
    elements.historyBtn.addEventListener('click', openHistoryModal);
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.dataset.modal));
    });
    
    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
    
    // History controls
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
    document.getElementById('exportHistoryBtn').addEventListener('click', () => exportHistory('json'));
    document.getElementById('exportCSVBtn').addEventListener('click', () => exportHistory('csv'));
    
    // Share stats
    document.getElementById('shareStatsBtn').addEventListener('click', shareStats);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyPress);
}

// ==================== THEME FUNCTIONS ====================
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    gameState.theme = isDark ? 'dark' : 'light';
    elements.themeToggle.innerHTML = isDark ? 
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    saveGameState();
}

function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    elements.soundToggle.classList.toggle('muted');
    elements.soundToggle.innerHTML = gameState.soundEnabled ? 
        '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
    saveGameState();
}

// ==================== PLAYER NAME ====================
function savePlayerName() {
    const name = elements.playerNameInput.value.trim();
    if (name) {
        gameState.playerName = name;
        elements.playerDisplayName.textContent = name;
        saveGameState();
        showNotification('Name saved!', 'success');
    }
}

// ==================== GAME MODE SELECTION ====================
function selectGameMode(mode) {
    gameState.gameMode = mode;
    
    // Update active state
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Show/hide tournament settings
    if (mode === 'tournament') {
        elements.tournamentSettings.classList.add('active');
    } else {
        elements.tournamentSettings.classList.remove('active');
    }
    
    // Show/hide extended choices
    const extendedChoices = document.querySelectorAll('.extended-choice');
    if (mode === 'extended') {
        extendedChoices.forEach(choice => choice.style.display = 'flex');
    } else {
        extendedChoices.forEach(choice => choice.style.display = 'none');
    }
    
    saveGameState();
}

function selectTournamentRounds(rounds) {
    gameState.tournamentRounds = parseInt(rounds);
    
    document.querySelectorAll('.tournament-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.rounds === rounds);
    });
    
    saveGameState();
}

// ==================== DIFFICULTY SELECTION ====================
function selectDifficulty(difficulty) {
    gameState.difficulty = difficulty;
    
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
    });
    
    // Update display
    const difficultyNames = {
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard'
    };
    elements.difficultyDisplay.textContent = difficultyNames[difficulty];
    
    saveGameState();
}

// ==================== KEYBOARD SHORTCUTS ====================
function handleKeyPress(e) {
    // Check if user is typing in input field
    if (e.target.tagName === 'INPUT') return;
    
    const key = e.key.toLowerCase();
    const keyMap = {
        'r': 'rock',
        'p': 'paper',
        's': 'scissors',
        'l': 'lizard',
        'k': 'spock'
    };
    
    if (keyMap[key]) {
        const choice = keyMap[key];
        // Check if choice is available in current mode
        if (gameState.gameMode === 'classic' && ['lizard', 'spock'].includes(choice)) {
            return;
        }
        makeChoice(choice);
    }
}

// ==================== GAME LOGIC ====================
function makeChoice(playerChoice) {
    // Disable buttons during animation
    disableChoiceButtons(true);
    
    // Update player display
    updateChoiceDisplay('player', playerChoice);
    
    // Animate computer thinking
    animateComputerThinking();
    
    // Get computer choice after delay
    setTimeout(() => {
        const computerChoice = getComputerChoice(playerChoice);
        updateChoiceDisplay('computer', computerChoice);
        
        // Determine winner
        const result = determineWinner(playerChoice, computerChoice);
        
        // Update game state
        updateGameState(result, playerChoice, computerChoice);
        
        // Show result
        showResult(result);
        
        // Re-enable buttons
        setTimeout(() => {
            disableChoiceButtons(false);
            resetChoiceDisplays();
        }, 3000);
        
    }, 1500);
}

function getComputerChoice(playerChoice) {
    const mode = gameState.gameMode === 'extended' ? 'extended' : 'classic';
    const availableChoices = Object.keys(gameRules[mode]);
    
    // Add to player history for learning
    gameState.playerHistory.push(playerChoice);
    if (gameState.playerHistory.length > 10) {
        gameState.playerHistory.shift();
    }
    
    let choice;
    
    switch (gameState.difficulty) {
        case 'easy':
            // Pure random
            choice = availableChoices[Math.floor(Math.random() * availableChoices.length)];
            break;
            
        case 'medium':
            // 70% random, 30% counter to most used player choice
            if (Math.random() < 0.7) {
                choice = availableChoices[Math.floor(Math.random() * availableChoices.length)];
            } else {
                const mostUsed = getMostUsedChoice(gameState.playerChoices);
                choice = getCounterChoice(mostUsed, mode);
            }
            break;
            
        case 'hard':
            // Learn from recent patterns
            if (gameState.playerHistory.length >= 3 && Math.random() < 0.6) {
                const pattern = detectPattern();
                choice = getCounterChoice(pattern, mode);
            } else {
                const mostUsed = getMostUsedChoice(gameState.playerChoices);
                choice = getCounterChoice(mostUsed, mode);
            }
            break;
            
        default:
            choice = availableChoices[Math.floor(Math.random() * availableChoices.length)];
    }
    
    return choice;
}

function getMostUsedChoice(choices) {
    const entries = Object.entries(choices);
    if (entries.length === 0) return 'rock';
    
    return entries.reduce((a, b) => a[1] > b[1] ? a : b)[0];
}

function getCounterChoice(choice, mode) {
    const rules = gameRules[mode];
    const availableChoices = Object.keys(rules);
    
    // Find choices that beat the given choice
    const counters = availableChoices.filter(c => rules[c].includes(choice));
    
    if (counters.length > 0) {
        return counters[Math.floor(Math.random() * counters.length)];
    }
    
    return availableChoices[Math.floor(Math.random() * availableChoices.length)];
}

function detectPattern() {
    const recent = gameState.playerHistory.slice(-3);
    
    // Check for repeating pattern
    if (recent[0] === recent[1] && recent[1] === recent[2]) {
        return recent[0]; // Player repeats same choice
    }
    
    // Check for alternating pattern
    if (recent.length >= 2) {
        return recent[recent.length - 1]; // Predict continuation
    }
    
    return getMostUsedChoice(gameState.playerChoices);
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    }
    
    const mode = gameState.gameMode === 'extended' ? 'extended' : 'classic';
    const rules = gameRules[mode];
    
    if (rules[playerChoice].includes(computerChoice)) {
        return 'win';
    }
    
    return 'lose';
}

// ==================== UPDATE FUNCTIONS ====================
function updateGameState(result, playerChoice, computerChoice) {
    // Update round
    gameState.currentRound++;
    
    // Update scores
    if (result === 'win') {
        gameState.scores.player++;
        gameState.currentStreak++;
        if (gameState.currentStreak > gameState.bestStreak) {
            gameState.bestStreak = gameState.currentStreak;
        }
    } else if (result === 'lose') {
        gameState.scores.computer++;
        const absStreak = Math.abs(gameState.currentStreak);
        if (absStreak > Math.abs(gameState.worstStreak)) {
            gameState.worstStreak = -absStreak;
        }
        gameState.currentStreak = gameState.currentStreak > 0 ? -1 : gameState.currentStreak - 1;
    } else {
        gameState.scores.draws++;
        gameState.currentStreak = 0;
    }
    
    // Update choice tracking
    gameState.playerChoices[playerChoice] = (gameState.playerChoices[playerChoice] || 0) + 1;
    gameState.computerChoices[computerChoice] = (gameState.computerChoices[computerChoice] || 0) + 1;
    
    // Add to history
    gameState.history.push({
        round: gameState.currentRound,
        playerChoice,
        computerChoice,
        result,
        timestamp: new Date().toISOString()
    });
    
    // Update display
    updateDisplay();
    updateQuickStats();
    
    // Save state
    saveGameState();
    
    // Check tournament end
    if (gameState.gameMode === 'tournament') {
        checkTournamentEnd();
    }
}

function updateDisplay() {
    elements.playerScore.textContent = gameState.scores.player;
    elements.computerScore.textContent = gameState.scores.computer;
    elements.drawScore.textContent = gameState.scores.draws;
    elements.currentStreak.textContent = Math.abs(gameState.currentStreak);
    elements.roundNumber.textContent = gameState.currentRound;
    
    // Update streak color
    if (gameState.currentStreak > 0) {
        elements.currentStreak.parentElement.style.color = 'var(--success-color)';
    } else if (gameState.currentStreak < 0) {
        elements.currentStreak.parentElement.style.color = 'var(--danger-color)';
    } else {
        elements.currentStreak.parentElement.style.color = 'var(--text-secondary)';
    }
}

function updateQuickStats() {
    const totalGames = gameState.scores.player + gameState.scores.computer + gameState.scores.draws;
    const winRate = totalGames > 0 ? 
        Math.round((gameState.scores.player / totalGames) * 100) : 0;
    
    elements.winRate.textContent = winRate + '%';
    elements.bestStreak.textContent = gameState.bestStreak;
    elements.totalGames.textContent = totalGames;
}

function updateChoiceDisplay(player, choice) {
    const iconElement = player === 'player' ? elements.playerChoiceIcon : elements.computerChoiceIcon;
    const textElement = player === 'player' ? elements.playerChoiceText : elements.computerChoiceText;
    const displayElement = player === 'player' ? 
        document.querySelector('.player-choice-display') : 
        document.querySelector('.computer-choice-display');
    
    iconElement.innerHTML = `<i class="fas ${choiceIcons[choice]}"></i>`;
    textElement.textContent = choice.charAt(0).toUpperCase() + choice.slice(1);
    displayElement.classList.add('active');
}

function resetChoiceDisplays() {
    elements.playerChoiceIcon.innerHTML = '<i class="fas fa-question"></i>';
    elements.playerChoiceText.textContent = 'Make Your Choice';
    elements.computerChoiceIcon.innerHTML = '<i class="fas fa-question"></i>';
    elements.computerChoiceText.textContent = 'Waiting...';
    
    document.querySelector('.player-choice-display').classList.remove('active', 'winner', 'loser');
    document.querySelector('.computer-choice-display').classList.remove('active', 'winner', 'loser');
}

function animateComputerThinking() {
    const icons = ['fa-hand-rock', 'fa-hand-paper', 'fa-hand-scissors'];
    let index = 0;
    
    const interval = setInterval(() => {
        elements.computerChoiceIcon.innerHTML = `<i class="fas ${icons[index]}"></i>`;
        index = (index + 1) % icons.length;
    }, 200);
    
    setTimeout(() => clearInterval(interval), 1500);
}

// ==================== RESULT DISPLAY ====================
function showResult(result) {
    const messages = {
        win: ['🎉 You Win!', '✨ Victory!', '🏆 Champion!', '💪 Nice Move!'],
        lose: ['😔 You Lose!', '💔 Computer Wins!', '🤖 Better Luck Next Time!'],
        draw: ['🤝 It\'s a Draw!', '⚖️ Tie Game!', '🔄 Same Choice!']
    };
    
    const message = messages[result][Math.floor(Math.random() * messages[result].length)];
    
    elements.resultMessage.textContent = message;
    elements.resultMessage.className = 'result-message show ' + result;
    
    // Update choice displays
    if (result === 'win') {
        document.querySelector('.player-choice-display').classList.add('winner');
        document.querySelector('.computer-choice-display').classList.add('loser');
        if (gameState.soundEnabled) playSound('win');
        triggerConfetti();
    } else if (result === 'lose') {
        document.querySelector('.player-choice-display').classList.add('loser');
        document.querySelector('.computer-choice-display').classList.add('winner');
        document.querySelector('.player-choice-display').classList.add('shake');
        if (gameState.soundEnabled) playSound('lose');
    } else {
        if (gameState.soundEnabled) playSound('draw');
    }
    
    // Hide result after 3 seconds
    setTimeout(() => {
        elements.resultMessage.classList.remove('show');
    }, 3000);
}

// ==================== CONFETTI ANIMATION ====================
function triggerConfetti() {
    const canvas = elements.confettiCanvas;
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confettiPieces = [];
    const confettiCount = 150;
    
    const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#00b894', '#fdcb6e', '#ff7675'];
    
    for (let i = 0; i < confettiCount; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 3 - 1.5,
            speedY: Math.random() * 3 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
    
    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiPieces.forEach((piece, index) => {
            ctx.save();
            ctx.translate(piece.x + piece.w / 2, piece.y + piece.h / 2);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.w / 2, -piece.h / 2, piece.w, piece.h);
            ctx.restore();
            
            piece.x += piece.speedX;
            piece.y += piece.speedY;
            piece.rotation += piece.rotationSpeed;
            
            if (piece.y > canvas.height) {
                confettiPieces.splice(index, 1);
            }
        });
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(drawConfetti);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    drawConfetti();
}

// ==================== SOUND EFFECTS ====================
function playSound(type) {
    // Create simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    const frequencies = {
        win: [523.25, 659.25, 783.99], // C, E, G
        lose: [392, 349.23], // G, F
        draw: [440] // A
    };
    
    const freq = frequencies[type];
    let time = audioContext.currentTime;
    
    freq.forEach((f, i) => {
        oscillator.frequency.setValueAtTime(f, time);
        gainNode.gain.setValueAtTime(0.3, time);
        gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
        time += 0.2;
    });
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(time);
}

// ==================== BUTTON CONTROLS ====================
function disableChoiceButtons(disabled) {
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.disabled = disabled;
    });
}

// ==================== TOURNAMENT ====================
function checkTournamentEnd() {
    const target = Math.ceil(gameState.tournamentRounds / 2);
    
    if (gameState.scores.player >= target) {
        showNotification('🏆 Tournament Won! You are the champion!', 'success');
        setTimeout(() => {
            if (confirm('Tournament finished! Start a new tournament?')) {
                resetGame();
            }
        }, 2000);
    } else if (gameState.scores.computer >= target) {
        showNotification('💔 Tournament Lost! Better luck next time!', 'danger');
        setTimeout(() => {
            if (confirm('Tournament finished! Start a new tournament?')) {
                resetGame();
            }
        }, 2000);
    }
}

// ==================== RESET GAME ====================
function resetGame() {
    if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
        const preserveName = gameState.playerName;
        const preserveTheme = gameState.theme;
        const preserveSound = gameState.soundEnabled;
        
        gameState.currentRound = 0;
        gameState.scores = { player: 0, computer: 0, draws: 0 };
        gameState.currentStreak = 0;
        gameState.playerHistory = [];
        
        updateDisplay();
        updateQuickStats();
        resetChoiceDisplays();
        
        gameState.playerName = preserveName;
        gameState.theme = preserveTheme;
        gameState.soundEnabled = preserveSound;
        
        saveGameState();
        showNotification('Game reset successfully!', 'success');
    }
}

// ==================== MODALS ====================
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function openStatsModal() {
    updateStatsModal();
    openModal('statsModal');
}

function updateStatsModal() {
    const totalGames = gameState.scores.player + gameState.scores.computer + gameState.scores.draws;
    const winRate = totalGames > 0 ? 
        Math.round((gameState.scores.player / totalGames) * 100) : 0;
    
    document.getElementById('statsWins').textContent = gameState.scores.player;
    document.getElementById('statsLosses').textContent = gameState.scores.computer;
    document.getElementById('statsDraws').textContent = gameState.scores.draws;
    document.getElementById('statsWinRate').textContent = winRate + '%';
    document.getElementById('statsCurrentStreak').textContent = Math.abs(gameState.currentStreak);
    document.getElementById('statsBestStreak').textContent = gameState.bestStreak;
    document.getElementById('statsWorstStreak').textContent = Math.abs(gameState.worstStreak);
    
    // Update choice stats
    updateChoiceStats('playerChoiceStats', gameState.playerChoices);
    updateChoiceStats('computerChoiceStats', gameState.computerChoices);
    
    // Update chart
    updatePerformanceChart();
}

function updateChoiceStats(elementId, choices) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    const sorted = Object.entries(choices).sort((a, b) => b[1] - a[1]);
    
    if (sorted.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">No data yet</p>';
        return;
    }
    
    sorted.forEach(([choice, count]) => {
        const item = document.createElement('div');
        item.className = 'choice-stat-item';
        item.innerHTML = `
            <span>
                <i class="fas ${choiceIcons[choice]}"></i>
                ${choice.charAt(0).toUpperCase() + choice.slice(1)}
            </span>
            <strong>${count}</strong>
        `;
        container.appendChild(item);
    });
}

function updatePerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    
    // Destroy existing chart if it exists
    if (window.performanceChartInstance) {
        window.performanceChartInstance.destroy();
    }
    
    const data = {
        labels: ['Wins', 'Losses', 'Draws'],
        datasets: [{
            label: 'Game Results',
            data: [gameState.scores.player, gameState.scores.computer, gameState.scores.draws],
            backgroundColor: [
                'rgba(0, 184, 148, 0.7)',
                'rgba(255, 118, 117, 0.7)',
                'rgba(253, 203, 110, 0.7)'
            ],
            borderColor: [
                'rgb(0, 184, 148)',
                'rgb(255, 118, 117)',
                'rgb(253, 203, 110)'
            ],
            borderWidth: 2
        }]
    };
    
    const config = {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: getComputedStyle(document.body).getPropertyValue('--text-color'),
                        font: {
                            size: 14,
                            family: 'Poppins'
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Overall Performance',
                    color: getComputedStyle(document.body).getPropertyValue('--text-color'),
                    font: {
                        size: 18,
                        family: 'Poppins',
                        weight: '600'
                    }
                }
            }
        }
    };
    
    window.performanceChartInstance = new Chart(ctx, config);
}

function openHistoryModal() {
    updateHistoryList();
    openModal('historyModal');
}

function updateHistoryList() {
    const container = document.getElementById('historyList');
    
    if (gameState.history.length === 0) {
        container.innerHTML = '<p class="no-history">No games played yet. Start playing to see history!</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Show history in reverse (most recent first)
    const reversedHistory = [...gameState.history].reverse();
    
    reversedHistory.forEach(game => {
        const item = document.createElement('div');
        item.className = `history-item ${game.result}`;
        item.innerHTML = `
            <div class="history-round">Round ${game.round}</div>
            <div class="history-details">
                <div class="history-choice">
                    <i class="fas ${choiceIcons[game.playerChoice]}"></i>
                    <span>${game.playerChoice}</span>
                </div>
                <span>vs</span>
                <div class="history-choice">
                    <i class="fas ${choiceIcons[game.computerChoice]}"></i>
                    <span>${game.computerChoice}</span>
                </div>
            </div>
            <div class="history-result ${game.result}">
                ${game.result === 'win' ? 'Won' : game.result === 'lose' ? 'Lost' : 'Draw'}
            </div>
        `;
        container.appendChild(item);
    });
}

function clearHistory() {
    if (confirm('Are you sure you want to clear all game history?')) {
        gameState.history = [];
        saveGameState();
        updateHistoryList();
        showNotification('History cleared!', 'success');
    }
}

function exportHistory(format) {
    if (gameState.history.length === 0) {
        alert('No history to export!');
        return;
    }
    
    let content, filename, mimeType;
    
    if (format === 'json') {
        content = JSON.stringify(gameState.history, null, 2);
        filename = `rps-history-${Date.now()}.json`;
        mimeType = 'application/json';
    } else if (format === 'csv') {
        const headers = 'Round,Player Choice,Computer Choice,Result,Timestamp\n';
        const rows = gameState.history.map(game => 
            `${game.round},${game.playerChoice},${game.computerChoice},${game.result},${game.timestamp}`
        ).join('\n');
        content = headers + rows;
        filename = `rps-history-${Date.now()}.csv`;
        mimeType = 'text/csv';
    }
    
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification(`History exported as ${format.toUpperCase()}!`, 'success');
}

function shareStats() {
    const totalGames = gameState.scores.player + gameState.scores.computer + gameState.scores.draws;
    const winRate = totalGames > 0 ? 
        Math.round((gameState.scores.player / totalGames) * 100) : 0;
    
    const shareText = `🎮 Rock Paper Scissors Stats 🎮
    
👤 Player: ${gameState.playerName}
🏆 Wins: ${gameState.scores.player}
💔 Losses: ${gameState.scores.computer}
🤝 Draws: ${gameState.scores.draws}
📊 Win Rate: ${winRate}%
🔥 Best Streak: ${gameState.bestStreak}
🎯 Total Games: ${totalGames}

Play now and beat my score!`;
    
    if (navigator.share) {
        navigator.share({
            title: 'My Rock Paper Scissors Stats',
            text: shareText
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Stats copied to clipboard!', 'success');
        }).catch(() => {
            alert('Unable to share. Please copy manually:\n\n' + shareText);
        });
    }
}

// ==================== NOTIFICATIONS ====================
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `result-message show ${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.zIndex = '3000';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// ==================== LOCAL STORAGE ====================
function saveGameState() {
    localStorage.setItem('rpsGameState', JSON.stringify(gameState));
}

function loadGameState() {
    const saved = localStorage.getItem('rpsGameState');
    if (saved) {
        const loadedState = JSON.parse(saved);
        Object.assign(gameState, loadedState);
    }
}

// ==================== INITIALIZE ON LOAD ====================
window.addEventListener('DOMContentLoaded', init);
