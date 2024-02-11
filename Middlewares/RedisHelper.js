import redisClient from '../Services/RedisClient';
import TokenHelper from './TokenHelper';

async function userCheckCache(req, res, next) {
    const decodedToken = TokenHelper.decodeToken(req.headers.authorization);

    const id =  decodedToken.id;
    const cacheKey = `user_data:${id}`;

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }
        req.cacheKey = cacheKey;
        next();
    } catch (error) {
        next(); 
    }
}

export default userCheckCache;