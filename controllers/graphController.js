const Graph = require("../models/graphModel");
const DirectorPaymentModel = require("../models/directorPaymentModel");

exports.monthwisePurchaseData = async (req, res, next) => {
  const year = req.query.year;
  const scriptId = req.query.scriptId; // You're interested in a specific script ID

  try {
    const monthwisePurchase = Array.from({ length: 12 }).fill(0);

    for (let i = 1; i <= 12; i++) {
      const startMonth = new Date(year, i - 1, 1);
      const endMonth = new Date(year, i, 1);
      const monthCount = await DirectorPaymentModel.countDocuments({
        scriptId: scriptId, // Filter by the specific script ID
        createdAt: { $gte: startMonth, $lt: endMonth },
      });

      monthwisePurchase[i - 1] = { x: i, y: monthCount };
    }

    res.status(200).json({
      success: true,
      monthwisePurchase,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.totalDataForProgressBar = async (req, res, next) => {
  const year = req.query.year;
  const scriptId = req.query.scriptId;

  try {
    const startYear = new Date(year, 0, 1);
    const endYear = new Date(year, 11, 31); // Month 11 represents December

    const totalYearCount = await DirectorPaymentModel.countDocuments({
      scriptId: scriptId,
      createdAt: { $gte: startYear, $lte: endYear }, // Filter by the entire year
    });

    res.status(200).json({
      success: true,
      totalYearCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};








