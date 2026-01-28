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

// Create a drifting/bouncing flower for background (anniversary page)
function createBackgroundFlower() {
    const flower = document.createElement('div');
    flower.className = 'background-flower';

    // Vary emoji / look
    const emojis = ['🌸', '🌺', '🌷', '🌹', '🌼', '💐'];
    flower.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Random starting position
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.top = Math.random() * 100 + 'vh';

    // Random size & animation timing
    const scale = Math.random() * 0.7 + 0.7; // 0.7 - 1.4
    flower.style.fontSize = (2.2 * scale) + 'em';
    // Faster, more lively motion and shorter delay so they feel constant
    flower.style.animationDuration = (Math.random() * 3 + 4) + 's'; // 4–7s
    flower.style.animationDelay = (Math.random() * 4) + 's';        // 0–4s

    // Slight color variation using filter
    const hue = Math.floor(Math.random() * 40) - 20; // -20 to +20 degrees
    flower.style.filter = `hue-rotate(${hue}deg)`;

    document.body.appendChild(flower);
}

// Create a gray cat (for anniversary page)
function createCat() {
    const cat = document.createElement('div');
    cat.className = 'magnus cat';
    
    // Create the 8-bit cat using CSS
    cat.innerHTML = `
        <div class="pixel-cat">
            <div class="cat-body"></div>
            <div class="cat-head"></div>
            <div class="cat-ear left"></div>
            <div class="cat-ear right"></div>
            <div class="cat-eye left"></div>
            <div class="cat-eye right"></div>
            <div class="cat-nose"></div>
            <div class="cat-mouth"></div>
            <div class="cat-whisker left-1"></div>
            <div class="cat-whisker left-2"></div>
            <div class="cat-whisker left-3"></div>
            <div class="cat-whisker right-1"></div>
            <div class="cat-whisker right-2"></div>
            <div class="cat-whisker right-3"></div>
            <div class="cat-tail">
                <div class="cat-tail-segment segment-1"></div>
                <div class="cat-tail-segment segment-2"></div>
                <div class="cat-tail-segment segment-3"></div>
                <div class="cat-tail-segment segment-4"></div>
                <div class="cat-tail-segment segment-5"></div>
            </div>
            <div class="cat-leg front-left"></div>
            <div class="cat-leg front-right"></div>
            <div class="cat-leg back-left"></div>
            <div class="cat-leg back-right"></div>
        </div>
    `;
    
    document.body.appendChild(cat);

    // Initialize position at bottom center of screen
    let position = { x: window.innerWidth / 2, y: window.innerHeight - 100 };
    let velocity = { x: 0, y: 0 };
    let mousePosition = { x: window.innerWidth / 2, y: window.innerHeight - 100 };
    let direction = 1;
    const maxSpeed = 2.5;
    const acceleration = 0.15;
    const deceleration = 0.92;
    let lastMouseMove = Date.now();
    let isFollowing = true;

    // Set initial position
    cat.style.position = 'fixed';
    cat.style.left = position.x + 'px';
    cat.style.top = position.y + 'px';
    cat.style.transform = 'translate(-50%, -50%)';
    cat.style.pointerEvents = 'none';
    cat.style.zIndex = '1000';

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

    function moveCat() {
        if (isFollowing) {
            // Calculate direction to mouse
            const dx = mousePosition.x - position.x;
            const dy = mousePosition.y - position.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only move if we're not too close to the mouse
            if (distance > 30) {
                // Normalize direction and apply acceleration
                const normalizedDx = dx / distance;
                const normalizedDy = dy / distance;
                
                velocity.x += normalizedDx * acceleration;
                velocity.y += normalizedDy * acceleration;
            } else {
                // Slow down when close to target
                velocity.x *= 0.85;
                velocity.y *= 0.85;
            }

            // Apply deceleration
            velocity.x *= deceleration;
            velocity.y *= deceleration;

            // Limit speed
            const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            if (currentSpeed > maxSpeed) {
                velocity.x = (velocity.x / currentSpeed) * maxSpeed;
                velocity.y = (velocity.y / currentSpeed) * maxSpeed;
            }

            // Update position
            position.x += velocity.x;
            position.y += velocity.y;

            // Keep within bounds (with padding for cat size)
            const padding = 30;
            position.x = Math.max(padding, Math.min(window.innerWidth - padding, position.x));
            position.y = Math.max(100, Math.min(window.innerHeight - padding, position.y));

            // Update direction based on movement
            if (Math.abs(velocity.x) > 0.05) {
                direction = velocity.x > 0 ? 1 : -1;
            }

            // Apply position and transform
            cat.style.left = position.x + 'px';
            cat.style.top = position.y + 'px';
            cat.style.transform = `translate(-50%, -50%) scaleX(${direction})`;
        } else {
            // If not following, gradually slow down
            velocity.x *= 0.95;
            velocity.y *= 0.95;
            
            // Update position with remaining velocity
            position.x += velocity.x;
            position.y += velocity.y;
            
            // Keep within bounds
            const padding = 30;
            position.x = Math.max(padding, Math.min(window.innerWidth - padding, position.x));
            position.y = Math.max(100, Math.min(window.innerHeight - padding, position.y));
            
            // Apply position
            cat.style.left = position.x + 'px';
            cat.style.top = position.y + 'px';
            cat.style.transform = `translate(-50%, -50%) scaleX(${direction})`;
        }

        requestAnimationFrame(moveCat);
    }

    moveCat();
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

    // Initialize position at bottom center of screen
    let position = { x: window.innerWidth / 2, y: window.innerHeight - 100 };
    let velocity = { x: 0, y: 0 };
    let mousePosition = { x: window.innerWidth / 2, y: window.innerHeight - 100 };
    let direction = 1;
    const maxSpeed = 2.5;
    const acceleration = 0.15;
    const deceleration = 0.92;
    let lastMouseMove = Date.now();
    let isFollowing = true;

    // Set initial position
    magnus.style.position = 'fixed';
    magnus.style.left = position.x + 'px';
    magnus.style.top = position.y + 'px';
    magnus.style.transform = 'translate(-50%, -50%)';
    magnus.style.pointerEvents = 'none';
    magnus.style.zIndex = '1000';

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
            if (distance > 30) {
                // Normalize direction and apply acceleration
                const normalizedDx = dx / distance;
                const normalizedDy = dy / distance;
                
                velocity.x += normalizedDx * acceleration;
                velocity.y += normalizedDy * acceleration;
            } else {
                // Slow down when close to target
                velocity.x *= 0.85;
                velocity.y *= 0.85;
            }

            // Apply deceleration
            velocity.x *= deceleration;
            velocity.y *= deceleration;

            // Limit speed
            const currentSpeed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
            if (currentSpeed > maxSpeed) {
                velocity.x = (velocity.x / currentSpeed) * maxSpeed;
                velocity.y = (velocity.y / currentSpeed) * maxSpeed;
            }

            // Update position
            position.x += velocity.x;
            position.y += velocity.y;

            // Keep within bounds (with padding for dog size)
            const padding = 30;
            position.x = Math.max(padding, Math.min(window.innerWidth - padding, position.x));
            position.y = Math.max(100, Math.min(window.innerHeight - padding, position.y));

            // Update direction based on movement
            if (Math.abs(velocity.x) > 0.05) {
                direction = velocity.x > 0 ? 1 : -1;
            }

            // Apply position and transform
            magnus.style.left = position.x + 'px';
            magnus.style.top = position.y + 'px';
            magnus.style.transform = `translate(-50%, -50%) scaleX(${direction})`;
        } else {
            // If not following, gradually slow down
            velocity.x *= 0.95;
            velocity.y *= 0.95;
            
            // Update position with remaining velocity
            position.x += velocity.x;
            position.y += velocity.y;
            
            // Keep within bounds
            const padding = 30;
            position.x = Math.max(padding, Math.min(window.innerWidth - padding, position.x));
            position.y = Math.max(100, Math.min(window.innerHeight - padding, position.y));
            
            // Apply position
            magnus.style.left = position.x + 'px';
            magnus.style.top = position.y + 'px';
            magnus.style.transform = `translate(-50%, -50%) scaleX(${direction})`;
        }

        requestAnimationFrame(moveMagnus);
    }

    moveMagnus();
}

// Create falling photo element
function createFallingPhoto() {
    const element = document.createElement('div');
    element.className = 'falling-photo';
    
    // List of actual image files
    const images = [
        // 2023 photos
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:12:14_gordon.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:10:28_rave_fit.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:09:29_my_clothes.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:08:26_20bday_dinner.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:05:18_croissant.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:04:09_post_throwup.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:06:08_smolder.jpg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:05:25_roadtrip.jpg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:04:21_hotpot_date.JPG',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:04:15_beautiful.jpg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:09:23_tofu.jpg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2023/2023:03:29_penguin.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:12:14_las_vegas.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:11:17_ba_ngoai.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:10:29_freaky.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:10:29_rave.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:10:13_ACL.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:04:14_first_concert.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:02:14_first_date.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:05:01_flic.jpg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:06:01_thrift.JPG',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:10:14_ACL2.jpg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2023/2023:04:01_longhorn_run.jpg',
        // 2024 photos
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:07:27_mandy_beauty.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:06:03_funny.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:12:25_ski_gear.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:12:23_skiiing.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:11:24_grad.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:10:15_chopin.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:10:03_blanton.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:09:23_gattis.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:05:08_drunk.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:02:14_valentines.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:11:24_grad2.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:11:03_roach.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:07:26_seattle.PNG',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:11:03_chicago.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:12:24_ski_smolder.JPG',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:05:01_glasses.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:10:16_study_acc.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:10:25_halloween.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:07:28_seattle.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:05:10_brandon_grad.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:02:10_temple.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:12:24_ski_town.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:11:25_grad_pics.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:09:15_feeding.jpg',
        // 2025 photos - Updated with new additions
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:01:06_bruno_surgery.JPG',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:03:16_gardens_singapore.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:03:22_coco_boats.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:03:22_hoi_an.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:04:18_blossoms.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:05:26_miumiu_mandy.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:05:29_miu_mandy_sleep.jpg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:06:10_mandy_workout.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:06:12_makeup.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:06:19_set.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:07:09_date_night.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2025/2025:07:26_beach.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:03:21_massage.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:03:22_hoian_mirror.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:05:10_mandy_grad.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:05:11_fountain.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:05:17_miumiu.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:06:19_gym.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:06:26_honors.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2025/2025:07:09_bufalina.jpeg',
        // Pet photos - Updated with new additions
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2023:10:12_m2.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2023:10:12_dead_magnus.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2024:09:26_chopin.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2024:09:28_magnus_hat.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2024:11:17_tieu.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2024:11:26_magnus_bonnet.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2024:12:15_magnus_travel.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:03:20_vietnam_dogs.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:04:27_tieu_jail.JPG',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:05:11_miu_ball.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:05:20_miu_gut.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:05:21_bruno.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:05:26_miu_sleep.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:05:30_miu_cute.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:05:31_vet.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:06:04_m1.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:06:06_miu_model.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:06:20_mandy_pets.JPG',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:06:21_tieu_miu.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:06:22_daughter.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:06:25_mandy_dead.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025_06_24_miu_sleep2.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:07:17_nini.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:07:21_kittens.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:07:25_escape.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:07:29_cosmo_rub.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/pets/2025:08:01_gizmo_clutch.jpeg',
        // Additional photos from https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:12:24_ski_town.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:11:25_grad_pics.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2024/2024:09:15_feeding.jpg',
        // Additional photos from https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:12:25_ski_gear.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:12:23_skiiing.jpeg',
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/mandy/2024/2024:11:24_grad2.jpeg',
        // First met photo
        'https://jkkucwnmpoeflwbvftio.supabase.co/storage/v1/object/public/images/moments/2022:10:01_first_met.jpg'
    ];
    
    // Create an image element
    const img = document.createElement('img');
    img.src = images[Math.floor(Math.random() * images.length)];
    img.style.width = (Math.random() * 50 + 50) + 'px'; // Random width between 50-100px
    img.style.height = 'auto';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    
    element.appendChild(img);
    
    // Position and animation properties
    // Randomly choose left or right side
    const isLeftSide = Math.random() < 0.5;
    // Position between 0-20% for left side or 80-100% for right side
    const position = isLeftSide ? 
        Math.random() * 20 : // 0-25% for left side
        80 + Math.random() * 20; // 75-100% for right side
    element.style.left = position + 'vw';
    
    element.style.animationDuration = (Math.random() * 2 + 4) + 's';
    const rot = Math.floor(Math.random() * 360);
    element.style.transform = `rotate(${rot}deg)`;
    
    document.body.appendChild(element);
    
    // Remove element after animation
    element.addEventListener('animationend', () => {
        element.remove();
    });
}

window.addEventListener('load', () => {
    // Check if we're on the anniversary page
    const isAnniversaryPage = window.location.pathname.includes('anniversary.html') || 
                               window.location.search.includes('anniversary');
    
    if (isAnniversaryPage) {
        // Create cat for anniversary page
        createCat();

        // Create a field of drifting flowers in the background
        const flowerCount = 35;
        for (let i = 0; i < flowerCount; i++) {
            createBackgroundFlower();
        }
    } else {
        // Create Magnus (dog) for other pages
        createMagnus();
    }

    // Only create falling elements on the main page
    if (window.location.pathname.endsWith('main.html')) {
        // Create falling elements more frequently and in bursts
        setInterval(() => {
            // Create emojis
            const emojiCount = Math.floor(Math.random() * 2) + 1; // 2-4 emojis per burst
            for (let i = 0; i < emojiCount; i++) {
                const types = ['bunny', 'boba', 'yarn', 'balloon'];
                const type = types[Math.floor(Math.random() * types.length)];
                createFallingElement(type);
            }
            
            // Create photos independently
            const photoCount = Math.floor(Math.random() * 3) + 2; // 2-4 photos per burst
            for (let i = 0; i < photoCount; i++) {
                createFallingPhoto();
            }
        }, 500);
    }
});
