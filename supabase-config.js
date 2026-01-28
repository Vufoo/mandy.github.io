// Supabase Storage Configuration
const SUPABASE_CONFIG = {
    projectUrl: 'https://jkkucwnmpoeflwbvftio.supabase.co',
    bucketName: 'images',
    // Directory structure matches local structure:
    // - family_friends/
    // - mandy/
    // - messages/
    // - moments/
    // - pets/
};

/**
 * Generates a Supabase Storage public URL for an image/video
 * @param {string} localPath - The local path (e.g., "mandy/2023/2023:03:29_penguin.jpeg")
 * @returns {string} Full Supabase Storage URL
 */
function getSupabaseImageUrl(localPath) {
    // Remove leading slash if present
    const cleanPath = localPath.startsWith('/') ? localPath.slice(1) : localPath;
    return `${SUPABASE_CONFIG.projectUrl}/storage/v1/object/public/${SUPABASE_CONFIG.bucketName}/${cleanPath}`;
}
