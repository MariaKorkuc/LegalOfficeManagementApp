const mongoose = require('mongoose');

const CaseModel = mongoose.model('Case');
const UserModel = mongoose.model('User');
const ClientModel = mongoose.model('Client');
const DocumentModel = mongoose.model('Document');


module.exports.users_with_most_cases = async (req, res) => {
    try {
        result = await CaseModel.aggregate([{
                $unwind: {
                    path: "$assignedUsers",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $group: {
                    _id: "$assignedUsers",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]);
        return res.json(result.map(user => ({
            user: user.user[0],
            count: user.count
        })))
    } catch (error) {
        res.status(400).json({
            error
        })
    }
};

module.exports.documents_per_cases = async (req, res) => {
    try {
        result = await CaseModel.aggregate([{
                $unwind: {
                    path: "$documents",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $group: {
                    _id: "$documents",
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $lookup: {
                    from: 'documents',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'documents'
                }
            },
            {
                $sort: {
                    count: -1
                }
            }
        ]);

        return res.json(result.map(document => ({
            document: document.documents[0],
            count: document.count
        })))
    } catch (error) {
        res.status(400).json({
            error
        })
    }
};

module.exports.longest_cases = async (req, res) => {
    try {
        const result = await CaseModel.aggregate([{
            $project: {
                caseData: "$$ROOT",
                case_duration_in_days: {
                    $trunc: {
                        $divide: [{
                            $subtract: ['$startDate', '$endDate']
                        }, 1000 * 60 * 60 * 24]
                    }
                }
            }
        }]);

        return res.json(result.map(caseData => ({
            case: caseData.caseData,
            case_duration_in_days: caseData.case_duration_in_days
        })))
    } catch (error) {
        res.status(400).json({
            error
        })
    }
};
