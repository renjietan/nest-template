export default {
    jwt_config: {
        secret: 'trj', // 使用 token 签名密文
        signOptions: { expiresIn: '60s' }, // 设置 token 的有效期\
    }
};
