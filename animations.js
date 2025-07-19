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
    const maxSpeed = 3;
    const acceleration = 4;
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

// Create falling photo element
function createFallingPhoto() {
    const element = document.createElement('div');
    element.className = 'falling-photo';
    
    // List of actual image files
    const images = [
        // 2023 photos
        'mandy/2023/2023:12:14_gordon.jpeg',
        'mandy/2023/2023:10:28_rave_fit.jpeg',
        'mandy/2023/2023:09:29_my_clothes.jpeg',
        'mandy/2023/2023:08:26_20bday_dinner.jpeg',
        'mandy/2023/2023:05:18_croissant.jpeg',
        'mandy/2023/2023:04:09_post_throwup.jpeg',
        'mandy/2023/2023:06:08_smolder.jpg',
        'mandy/2023/2023:05:25_roadtrip.jpg',
        'mandy/2023/2023:04:21_hotpot_date.JPG',
        'mandy/2023/2023:04:15_beautiful.jpg',
        'mandy/2023/2023:09:23_tofu.jpg',
        'mandy/2023/2023:03:29_penguin.jpeg',
        'moments/2023/2023:12:14_las_vegas.jpeg',
        'moments/2023/2023:11:17_ba_ngoai.jpeg',
        'moments/2023/2023:10:29_freaky.jpeg',
        'moments/2023/2023:10:29_rave.jpeg',
        'moments/2023/2023:10:13_ACL.jpeg',
        'moments/2023/2023:04:14_first_concert.jpeg',
        'moments/2023/2023:02:14_first_date.jpeg',
        'moments/2023/2023:05:01_flic.jpg',
        'moments/2023/2023:06:01_thrift.JPG',
        'moments/2023/2023:10:14_ACL2.jpg',
        'moments/2023/2023:04:01_longhorn_run.jpg',
        // 2024 photos
        'mandy/2024/2024:07:27_mandy_beauty.jpeg',
        'mandy/2024/2024:06:03_funny.jpeg',
        'mandy/2024/2024:12:25_ski_gear.jpeg',
        'mandy/2024/2024:12:23_skiiing.jpeg',
        'mandy/2024/2024:11:24_grad.jpeg',
        'mandy/2024/2024:10:15_chopin.jpeg',
        'mandy/2024/2024:10:03_blanton.jpeg',
        'mandy/2024/2024:09:23_gattis.jpeg',
        'mandy/2024/2024:05:08_drunk.jpeg',
        'mandy/2024/2024:02:14_valentines.jpeg',
        'mandy/2024/2024:11:24_grad2.jpeg',
        'mandy/2024/2024:11:03_roach.jpeg',
        'moments/2024/2024:07:26_seattle.PNG',
        'moments/2024/2024:11:03_chicago.jpeg',
        'moments/2024/2024:12:24_ski_smolder.JPG',
        'moments/2024/2024:05:01_glasses.jpeg',
        'moments/2024/2024:10:16_study_acc.jpeg',
        'moments/2024/2024:10:25_halloween.jpeg',
        'moments/2024/2024:07:28_seattle.jpeg',
        'moments/2024/2024:05:10_brandon_grad.jpeg',
        'moments/2024/2024:02:10_temple.jpeg',
        'moments/2024/2024:12:24_ski_town.jpeg',
        'moments/2024/2024:11:25_grad_pics.jpeg',
        'moments/2024/2024:09:15_feeding.jpg',
        // 2025 photos
        'mandy/2025/2025:01:06_bruno_surgery.JPG',
        'mandy/2025/2025:03:16_gardens_singapore.jpeg',
        'mandy/2025/2025:03:22_coco_boats.jpeg',
        'mandy/2025/2025:03:22_hoi_an.jpeg',
        'mandy/2025/2025:05:26_miumiu_mandy.jpeg',
        'mandy/2025/2025:05:29_miu_mandy_sleep.jpg',
        'mandy/2025/2025:06:10_mandy_workout.jpeg',
        'mandy/2025/2025:06:12_makeup.jpeg',
        'mandy/2025/2025:06:19_set.jpeg',
        'mandy/2025/2025:07:09_date_night.jpeg',
        'moments/2025/2025:03:21_massage.jpeg',
        'moments/2025/2025:03:22_hoian_mirror.jpeg',
        'moments/2025/2025:05:10_mandy_grad.jpeg',
        'moments/2025/2025:05:11_fountain.jpeg',
        'moments/2025/2025:05:17_miumiu.jpeg',
        'moments/2025/2025:06:19_gym.jpeg',
        'moments/2025/2025:06:26_honors.jpeg',
        'moments/2025/2025:07:09_bufalina.jpeg',
        // Pet photos
        'pets/2023:10:12_m2.jpeg',
        'pets/2023:10:12_dead_magnus.jpeg',
        'pets/2024:09:26_chopin.jpeg',
        'pets/2024:09:28_magnus_hat.jpeg',
        'pets/2024:11:17_tieu.jpeg',
        'pets/2024:11:26_magnus_bonnet.jpeg',
        'pets/2024:12:15_magnus_travel.jpeg',
        'pets/2025:03:20_vietnam_dogs.jpeg',
        'pets/2025:04:27_tieu_jail.JPG',
        'pets/2025:05:11_miu_ball.jpeg',
        'pets/2025:05:20_miu_gut.jpeg',
        'pets/2025:05:26_miu_sleep.jpeg',
        'pets/2025:05:30_miu_cute.jpeg',
        'pets/2025:05:31_vet.jpeg',
        'pets/2025:06:04_m1.jpeg',
        'pets/2025:06:06_miu_model.jpeg',
        'pets/2025:06:20_mandy_pets.JPG',
        'pets/2025:06:21_tieu_miu.jpeg',
        'pets/2025:06:22_daughter.jpeg',
        'pets/2025_06_24_miu_sleep2.jpeg',
        'pets/2025:07:17_nini.jpeg',
        // Additional photos from moments/2024
        'moments/2024/2024:12:24_ski_town.jpeg',
        'moments/2024/2024:11:25_grad_pics.jpeg',
        'moments/2024/2024:09:15_feeding.jpg',
        // Additional photos from mandy/2024
        'mandy/2024/2024:12:25_ski_gear.jpeg',
        'mandy/2024/2024:12:23_skiiing.jpeg',
        'mandy/2024/2024:11:24_grad2.jpeg',
        // First met photo
        'moments/2022:10:01_first_met.jpg'
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
    // Create Magnus
    createMagnus();

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
