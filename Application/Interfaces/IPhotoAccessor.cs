using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        //these 2 having nothing to do with db just for cloudinary
         Task<PhotoUploadResult> AddPhoto(IFormFile file);
         Task<string> DeletePhoto(string publicId);
    }
}