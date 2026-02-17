const gameController = require('../controllers/gameController');
const Games = require('../models/gameModel');
const scoreController = require('../controllers/scoreController');
const Scores = require('../models/scoreModel');
const acheivementController = require('../controllers/acheivementController');
const Acheivements = require('../models/acheivementModel');
const userController = require('../controllers/userController');
const Users = require('../models/userModel');

// Making a mock model so it doesnt mess w/ the database
jest.mock('../models/gameModel');

describe('Game Endpoint Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    // make a fake user
    req = {
      session: { user: { userId: '123', isAdmin: true } },
      params: { id: 'abc' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn()
    };
  });

  it('getAll should return data and 200 status', async () => {
    const mockData = [{ name: 'Game 1' }];
    Games.findAll.mockResolvedValue(mockData);

    await gameController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

    it('getSingle should return data and 200 status', async () => {
    const mockData = [{ name: 'Game 1' }];
    Games.findOne.mockResolvedValue(mockData);

    await gameController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

    it('getSingle should return 400 status when given an improper return', async () => {
    const mockData = null;
    Games.findOne.mockResolvedValue(mockData);

    await gameController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({"message": "Game not found"});
  });
    it('getSingle should return 500 status when given improper inputs', async () => {
    const mockData = null;
    Games.findOne.mockResolvedValue(mockData);

    await gameController.getSingle(null, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// Making a mock model so it doesnt mess w/ the database
jest.mock('../models/scoreModel');

describe('Score Endpoint Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    // make a fake user
    req = {
      session: { user: { userId: '123', isAdmin: true } },
      params: { id: 'abc' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn()
    };
  });

  it('getAll should return data and 200 status', async () => {
    const mockData = [{ name: 'score 1' }];
    Scores.findAll.mockResolvedValue(mockData);

    await scoreController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

    it('getSingle should return data and 200 status', async () => {
    const mockData = [{ name: 'score 1' }];
    Scores.findOne.mockResolvedValue(mockData);

    await scoreController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

    it('getSingle should return 400 status when given an improper return', async () => {
    const mockData = null;
    Scores.findOne.mockResolvedValue(mockData);

    await scoreController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({"message": "Score not found"});
  });

    it('getSingle should return 500 status when given improper inputs', async () => {
    const mockData = null;
    Scores.findOne.mockResolvedValue(mockData);

    await scoreController.getSingle(null, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// Making a mock model so it doesnt mess w/ the database
jest.mock('../models/acheivementModel');

describe('Acheivement Endpoint Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    // make a fake user
    req = {
      session: { user: { userId: '123', isAdmin: true } },
      params: { id: 'abc' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn()
    };
  });

  it('getAll should return data and 200 status', async () => {
    const mockData = [{ name: 'acheivement 1' }];
    Acheivements.findAll.mockResolvedValue(mockData);

    await acheivementController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

    it('getSingle should return data and 200 status', async () => {
    const mockData = [{ name: 'acheivement 1' }];
    Acheivements.findOne.mockResolvedValue(mockData);

    await acheivementController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

    it('getSingle should return 400 status when given an improper return', async () => {
    const mockData = null;
    Acheivements.findOne.mockResolvedValue(mockData);

    await acheivementController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({"message": "Acheivement not found"});
  });

    it('getSingle should return 500 status when given improper inputs', async () => {
    const mockData = null;
    Acheivements.findOne.mockResolvedValue(mockData);

    await acheivementController.getSingle(null, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// Making a mock model so it doesnt mess w/ the database
jest.mock('../models/userModel');

describe('User Endpoint Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    // make a fake user
    req = {
      session: { user: { userId: '123', isAdmin: true } },
      params: { id: 'abc' }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      setHeader: jest.fn()
    };
  });

  it('getAll should return data and 200 status', async () => {
    const mockData = [{ name: 'user 1' }];
    Users.findAll.mockResolvedValue(mockData);

    await userController.getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

    it('getSingle should return data and 200 status', async () => {
    const mockData = [{ name: 'user 1' }];
    Users.findOne.mockResolvedValue(mockData);

    await userController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

      it('getSingle should return 400 status when given an improper return', async () => {
    const mockData = null;
    Users.findOne.mockResolvedValue(mockData);

    await userController.getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({"message": "User not found"});
  });

    it('getSingle should return 500 status when given improper inputs', async () => {
    const mockData = null;
    Users.findOne.mockResolvedValue(mockData);

    await userController.getSingle(null, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});