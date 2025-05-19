
using AutoMapper;
using LiveFeedback.Core.DTOs;
using LiveFeedback.Core.Entities;
using LiveFeedback.Core.Interfaces.IRepositories;
using LiveFeedback.Core.Interfaces.IServices;
using Microsoft.AspNetCore.Identity;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<List<UserDTO>> GetAllUsersAsync()
    {
        var users = await _userRepository.GetUsersWithDetailsAsync();
        return _mapper.Map<List<UserDTO>>(users);
    }
    public async Task<List<string>> GetUsersSendAsyc()
    {
        var EmailUsers = await _userRepository.GetUsersSendAsync();
        return EmailUsers;
    }
    public async Task<UserDTO> GetUserByIdAsync(int id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        return _mapper.Map<UserDTO>(user);
    }
    
    public async Task<Send> GetUserSendByIdAsync(int id)
    {
        var user = await _userRepository.GetUserSendByIdAsync(id);
        if(user == null) return null;
        return user;
    }
    //public async Task<UserDTO> AddUserAsync(UserDTO userDto)
    //{
    //    var user = _mapper.Map<User>(userDto);
    //    await _userRepository.AddAsync(user);
    //    return _mapper.Map<UserDTO>(user);
    //}
    public async Task<UserDTO> AddUserAsync(UserDTO userDto)
    {
        var user = _mapper.Map<User>(userDto);
        Console.WriteLine("p" + userDto.Password);
        Console.WriteLine("p" + user.Password);

        // הוספת חישוב PasswordHash (הסיסמה לא תישלח ישירות לבסיס הנתונים, אלא תעבור חישוב)
        //var passwordHasher = new PasswordHasher<User>();
        //user.Password = passwordHasher.HashPassword(user, userDto.Password);  // כאן מתבצע החישוב
        //user.Email = userDto.Email;
        await _userRepository.AddAsync(user); // משתמש נוסף

        return _mapper.Map<UserDTO>(user);

    }


    //public async Task<User> AddUserAsync(User user)
    //{
    //    await _userRepository.AddAsync(user); // הוספה של ה-Entity
    //    return user; // מחזירים את ה-Entity לאחר ההוספה
    //}




    public async Task<UserDTO> UpdateUserAsync(int id, UserDTO userDto)
    {
        // מציאת התמונה לפי ה-ID בלבד
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return null;

        // ממפים את ה-DTO ל-Entity (MyImage), אבל לא משפיעים על ה-ID
        User entity = _mapper.Map<User>(userDto);

        // עושים Save רק לאחר המיפוי, לא מעדכנים את ה-ID
       var u= await _userRepository.UpdateAsync(id, entity);  // אל תעביר את ה-ID כאן

        return _mapper.Map<UserDTO>(u);
    }



    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null) return false;

        await _userRepository.DeleteUserAsync(id);
        return true;
    }
    //public async Task<UserDTO> AuthenticateAsync(string email, string password)
    //{

    //    // חיפוש משתמש על פי דואר אלקטרוני
    //    var user = await _userRepository.GetUserByEmailAsync(email);  // תחפש את המשתמש על פי הדוא"ל
    //    if (user == null) return null;  // אם לא נמצא משתמש, מחזירים null

    //    // השוואת הסיסמה
    //    //var passwordHasher = new PasswordHasher<UserDTO>();







    //    var passwordHasher = new PasswordHasher<User>();
    //    // שימוש ב-PasswordHasher לאימות הסיסמה
    //    //var userDto = _mapper.Map<UserDTO>(user);
    //    var passwordVerificationResult = passwordHasher.VerifyHashedPassword(user, user.Password, password);
    //    Console.WriteLine(passwordVerificationResult);
    //    if (passwordVerificationResult == PasswordVerificationResult.Failed)  // אם הסיסמה לא נכונה
    //    {
    //        return null;
    //    }

    //    // אם האימות הצליח, מחזירים את המידע על המשתמש
    //    return _mapper.Map<UserDTO>(user);
    //}
    public async Task<UserDTO> ValidateUser(string email, string password)
    {
        User user = await _userRepository.GetUserByEmailAsync(email);

        if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            return _mapper.Map<UserDTO>(user);
        }

        return null;
    }
    public async Task<UserDTO> AuthenticateAsync(string email, string password)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        if (user == null) return null;

        var passwordHasher = new PasswordHasher<User>(); // ✅ Ensure consistency

        var passwordVerificationResult = passwordHasher.VerifyHashedPassword(user, user.Password, password);
        Console.WriteLine($"Password Verification Result: {passwordVerificationResult}");

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            return null;
        }

        return _mapper.Map<UserDTO>(user);
    }

    public async Task<UserDTO> GetUserByEmailAsync(string email)
    {
        var user = await _userRepository.GetUserByEmailAsync(email);
        return _mapper.Map<UserDTO>(user);
    }


}


