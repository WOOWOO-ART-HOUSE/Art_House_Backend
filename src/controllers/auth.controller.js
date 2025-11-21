const healthCheck = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Health check successful.',
    });
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      success: false,
      message: 'Health check error.',
    });
  }
};

const register = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'Register successful.',
    });
  } catch (error) {
    console.error('Error fetching to register:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching to register.',
    });
  }
};

const login = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'login successful.',
    });
  } catch (error) {
    console.error('Error fetching to login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching to login.',
    });
  }
};

const requestOtp = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'request otp successful.',
    });
  } catch (error) {
    console.error('Error fetching to login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching to login.',
    });
  }
};
export {healthCheck, register, login, requestOtp};
