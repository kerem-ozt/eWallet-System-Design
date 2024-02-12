const chaiPromise = import('chai');
const chaiHttpPromise = import('chai-http');

async function setupChai() {
  const chai = await chaiPromise;
  const chaiHttp = await chaiHttpPromise;

  chai.use(chaiHttp.default);

  return chai;
}

describe('Users', function () {

    let chai, agent;

    before(async function () {
    this.timeout(5000);
    chai = (await import('chai')).default;
    const chaiHttp = (await import('chai-http')).default;
    chai.use(chaiHttp);

    const { default: app } = await import('../index.js');
    agent = chai.request.agent(app);

    await new Promise(resolve => setTimeout(resolve, 4000));
    });

    beforeEach(function (done) {
        agent
            .post('/auth/login')
            .send({ email: 'mkeremozt@gmail.com', password: '345678' })
            .end((err, res) => {
                if (err) done(err);
                res.should.have.status(200);
                done();
        });
    });

    it('should return a user object for a valid user id', function (done) {
        agent
            .get('/user/current')
            .set('authorization', `4504ba892627ecdd63ce84d95b5252681d3d49ea`)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});