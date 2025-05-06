// Create falling elements (bunnies and boba)
function createFallingElement(type) {
    const element = document.createElement('div');
    element.className = `falling-element ${type}`;
    element.style.left = Math.random() * 100 + 'vw';
    // Randomize size
    const scale = Math.random() * 0.5 + 0.75;
    element.style.fontSize = (2 * scale) + 'em';
    // Randomize animation duration
    element.style.animationDuration = (Math.random() * 2 + 2) + 's';
    element.style.opacity = Math.random() * 0.5 + 0.5;
    // Randomize initial rotation
    const rot = Math.floor(Math.random() * 360);
    element.style.transform = `rotate(${rot}deg)`;
    
    if (type === 'bunny') {
        element.innerHTML = '🐰';
    } else if (type === 'boba') {
        element.innerHTML = '🧋';
    } else if (type === 'yarn') {
        element.innerHTML = '🧶';
    } else if (type === 'balloon') {
        element.innerHTML = '🎈';
    }
    
    document.body.appendChild(element);
    
    // Remove element after animation
    element.addEventListener('animationend', () => {
        element.remove();
    });
}

// Create Magnus the dog
function createMagnus() {
    const magnus = document.createElement('div');
    magnus.className = 'magnus';
    
    // Create the 8-bit dog using CSS
    magnus.innerHTML = `
        <div class="pixel-dog">
            <div class="dog-body"></div>
            <div class="dog-head"></div>
            <div class="dog-ear left"></div>
            <div class="dog-ear right"></div>
            <div class="dog-eye left"></div>
            <div class="dog-eye right"></div>
            <div class="dog-nose"></div>
            <div class="dog-snout"></div>
            <div class="dog-fluff"></div>
            <div class="dog-fluff right"></div>
            <div class="dog-tail"></div>
            <div class="dog-leg front-left"></div>
            <div class="dog-leg front-right"></div>
            <div class="dog-leg back-left"></div>
            <div class="dog-leg back-right"></div>
            <div class="dog-blush left"></div>
            <div class="dog-blush right"></div>
            <div class="dog-tongue"></div>
        </div>
    `;
    
    document.body.appendChild(magnus);

    let position = { x: 0, y: window.innerHeight - 100 };
    let velocity = { x: 0, y: 0 };
    let mousePosition = { x: 0, y: 0 };
    let direction = 1;
    const maxSpeed = 7;
    const acceleration = 10;
    const deceleration = 0.01;
    let isMoving = true;
    let lastMouseMove = Date.now();
    let isFollowing = true;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mousePosition = { x: e.clientX, y: e.clientY };
        lastMouseMove = Date.now();
        isFollowing = true;
    });

    // Stop following if mouse hasn't moved for a while
    setInterval(() => {
        if (Date.now() - lastMouseMove > 2000) {
            isFollowing = false;
        }
    }, 1000);

    function moveMagnus() {
        if (isFollowing) {
            // Calculate direction to mouse
            const dx = mousePosition.x - position.x;
            const dy = mousePosition.y - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only move if we're not too close to the mouse
            if (distance > 20) {
                // Accelerate towards mouse
                velocity.x += (dx / distance) * acceleration;
                velocity.y += (dy / distance) * acceleration;
            } else {
                // Slow down when close to target
                velocity.x *= 0.9;
                velocity.y *= 0.9;
            }

            // Apply deceleration
            velocity.x *= (1 - deceleration);
            velocity.y *= (1 - deceleration);

            // Limit speed
            const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            if (currentSpeed > maxSpeed) {
                velocity.x = (velocity.x / currentSpeed) * maxSpeed;
                velocity.y = (velocity.y / currentSpeed) * maxSpeed;
            }

            // Update position
            position.x += velocity.x;
            position.y += velocity.y;

            // Keep within bounds
            position.x = Math.max(0, Math.min(window.innerWidth - 50, position.x));
            position.y = Math.max(100, Math.min(window.innerHeight - 100, position.y));

            // Update direction
            if (velocity.x > 0.1) {
                direction = 1;
                magnus.style.transform = 'scaleX(1)';
            } else if (velocity.x < -0.1) {
                direction = -1;
                magnus.style.transform = 'scaleX(-1)';
            }

            // Apply position
            magnus.style.left = position.x + 'px';
            magnus.style.bottom = (window.innerHeight - position.y) + 'px';
        } else {
            // If not following, gradually slow down
            velocity.x *= 0.95;
            velocity.y *= 0.95;
            
            // Update position with remaining velocity
            position.x += velocity.x;
            position.y += velocity.y;
            
            // Keep within bounds
            position.x = Math.max(0, Math.min(window.innerWidth - 50, position.x));
            position.y = Math.max(100, Math.min(window.innerHeight - 100, position.y));
            
            // Apply position
            magnus.style.left = position.x + 'px';
            magnus.style.bottom = (window.innerHeight - position.y) + 'px';
        }

        requestAnimationFrame(moveMagnus);
    }

    moveMagnus();
}

window.addEventListener('load', () => {
    // Create Magnus
    createMagnus();

    // Only create falling elements on the main page
    if (window.location.pathname.endsWith('main.html')) {
        // Create falling elements more frequently and in bursts
        setInterval(() => {
            const count = Math.floor(Math.random() * 3) + 2; // 2-4 elements per burst
            for (let i = 0; i < count; i++) {
                const types = ['bunny', 'boba', 'yarn', 'balloon'];
                const type = types[Math.floor(Math.random() * types.length)];
                createFallingElement(type);
            }
        }, 500);
    }
});
