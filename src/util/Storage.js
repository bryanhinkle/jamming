import ls from 'local-storage';

const Storage = {
    checkExpire() {
    const { accessToken, tokenExpire } = this.state;

    },

    setExpire(expires) {
        let time = new Date();
        const expireTime = Number((time.getHours() + (expires / 3600)).toString() + time.getMinutes().toString() + time.getSeconds().toString());
        ls.set('tokenExpires', expireTime);
        return expireTime;
    }
}

export default Storage;