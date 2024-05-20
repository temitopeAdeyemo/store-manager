import { Types } from 'mongoose';
import UserRepository from '../modules/auth/models/repositories/UserRepository';


describe('Repository', () => {
  describe('User Repository', () => {
    const userRepository = new UserRepository();

    it('should create a user Data', async () => {
      const mockUser = {
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope1@gmail.com',
      };
      const spy = jest.spyOn(userRepository, 'create').mockReturnValueOnce(mockUser as any);
      await userRepository.create(mockUser);

      const spyCreatedUser = spy.mock.results[0].value;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(spyCreatedUser.first_name).toEqual(mockUser.first_name);
      spy.mockReset();
    });

    it('should get a user Data', async () => {
      const mockUser = {
        _id: new Types.ObjectId().toString(),
        password: 'Temitope12@#',
        first_name: 'Temitope',
        last_name: 'Julius',
        email: 'temitope1@gmail.com',
      };

      const spy = jest.spyOn(userRepository, 'findByUniqueData').mockReturnValueOnce(mockUser as any);
      userRepository.findByUniqueData('_id', mockUser._id);

      const spyFetchedUser = spy.mock.results[0].value;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyFetchedUser.first_name).toEqual(mockUser.first_name);
      spy.mockReset();
    });

    it('Should return the list of users successfully', () => {
      const mockedUserList = [
        {
          _id: new Types.ObjectId().toString(),
          password: 'Temitope12@#',
          first_name: 'Temitope',
          last_name: 'Julius',
          email: 'temitope1@gmail.com',
        },
        {
          _id: new Types.ObjectId().toString(),
          password: 'Temitope12@#',
          first_name: 'Temitope',
          last_name: 'Julius',
          email: 'temitope1@gmail.com',
        },
      ];

      const spy = jest.spyOn(userRepository, 'fetchAll').mockReturnValueOnce(mockedUserList as any);
      userRepository.fetchAll({});

      const spyFetchedUsers = spy.mock.results[0].value;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyFetchedUsers).toHaveLength(2);
      spy.mockReset();
    });

    it('Should update a user successfully!', () => {
      const _id = new Types.ObjectId().toString();

      const updateData = {
        address: 'user address 1',
        email: 'john@gmail.com',
        name: 'John',
      };
      const spy = jest.spyOn(userRepository, 'updateById').mockReturnValueOnce(updateData as any);
      userRepository.updateById(_id, updateData);

      const spyUpdatedUser = spy.mock.results[0].value;
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spyUpdatedUser.email).toEqual('john@gmail.com');
      spy.mockReset();
    });

  it("Should delete a user successfully!", () => {
    const mockUser = {
      _id:  new Types.ObjectId().toString(),
      address: "user address 1",
      email: "john@gmail.com",
      name: "John",
    };
    const spy = jest.spyOn(userRepository, 'deleteById').mockReturnValueOnce(mockUser as any);
    userRepository.deleteById(mockUser._id);

    const spyDeletedUser = spy.mock.results[0].value;
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spyDeletedUser._id).toEqual(mockUser._id);
    spy.mockReset();
  });
  });
});
