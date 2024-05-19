"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../entities/User");
class UserRepository {
    constructor() {
        this.user = User_1.User;
    }
    async create(data) {
        const user = await this.user.create(data);
        return user;
    }
    async findByPhoneNumber(phone_number) {
        const user = await this.user.findOne({ phone_number });
        return user;
    }
    async findByEmail(email) {
        const user = await this.user.findOne({ email });
        // console.log('This is coming from the repositories', user);
        return user;
    }
    async findAll() {
        const user = await this.user.find();
        // console.log('This is coming from find all users the repositories', user);
        return user;
    }
    async genericFindOne(phone_number, email) {
        let query;
        phone_number ? (query = { phone_number }) : (query = { email });
        // console.log(query);
        const user = await this.user.findOne(query);
        return user;
    }
    async save(user) {
        await user.save();
    }
    async findById(id) {
        const user = await this.user.findById(id);
        // console.log(767, user);
        return user;
    }
    async findByBvn(hashedBvn) {
        const user = await this.user.findOne({ bvn: hashedBvn });
        return user;
    }
    async update(id, data) {
        const user = await this.user.findByIdAndUpdate(id, data, { new: true });
        return user;
    }
    async deleteById(id) {
        const user = await this.user.findByIdAndDelete(id);
        return user;
    }
    async deleteByPhoneNumber(phone_number) {
        const user = await this.user.findOneAndDelete({ phone_number });
        return user;
    }
    async findByReferralId(referral_code) {
        const user = await this.user.findOne({ referral_code });
        return user;
    }
}
exports.default = UserRepository;
