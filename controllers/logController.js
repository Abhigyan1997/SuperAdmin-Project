
const Log = require('../models/feed'); // Adjust the path as per your project structure

async function getLogs(req, res) {
    try {

        // Query the database to get logs
        const logs = await Log.findAll();

        res.json({ logs });
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

async function editLog(req, res) {
    try {
        const logId = req.params.id;
        const { name, description } = req.body;

        // Find the log by ID
        const log = await Log.findByPk(logId);

        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }

        // Update the log data
        log.name = name;
        log.description = description;

        // Save the changes to the database
        await log.save();

        return res.status(200).json({ message: 'Log updated successfully' });
    } catch (error) {
        console.error('Error editing log:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

async function deleteLog(req, res) {
    try {
        const logId = req.params.id;

        // Find the log by ID
        const log = await Log.findByPk(logId);

        if (!log) {
            return res.status(404).json({ message: 'Log not found' });
        }

        // Delete the log from the database
        await log.destroy();

        return res.status(200).json({ message: 'Log deleted successfully' });
    } catch (error) {
        console.error('Error deleting log:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}


module.exports = {
    getLogs,
    editLog,
    deleteLog
}