const dbConf = require("../config/db")

module.exports = {
    getTitle: (req, res) => {
        dbConf.query(`Select * from titles`,
            (error, result) => {
                if (error) return res.status(500).send(error);
                return res.status(200).send(result);
            })
    },
    deleteTitle: (req, res) => {
        let idtitle = req.params.idtitle;
        dbConf.query(`Update titles set isDeleted=1 where idtitle = ${idtitle}`,
            (error, result) => {
                if (error) return res.status(500).send(error);
                if (!result.affectedRows) return res.status(400).send({ success: false });
                return res.status(200).send({ success: true });
            })
    },
    editTitle: (req, res) => {
        let { title_code, title_name } = req.body;
        let idtitle = req.params.idtitle;
        dbConf.query(`Update titles set
        title_code = '${title_code}',
        title_name = '${title_name}'
        where idtitle = ${idtitle}`,
            (error, result) => {
                if (error) return res.status(500).send(error);
                if (!result.affectedRows) return res.status(400).send({ success: false });
                return res.status(200).send({ success: true });
            })
    },
    addTitle: (req, res) => {
        let { title_code, title_name } = req.body;
        dbConf.query(`Insert into titles (title_code, title_name)
        value ('${title_code}', '${title_name}')`,
            (error, result) => {
                if (error) return res.status(500).send(error);
                if (!result.insertId) return res.status(400).send({ success: false });
                return res.status(200).send({ success: true });
            })
    },
    getPosition: (req, res) => {
        dbConf.query(`Select p.idposition, p.position_code, p.position_name, p.title_id, t.title_code, t.title_name, t.isDeleted 
        from positions p join titles t on p.title_id=t.idtitle 
        order by p.idposition asc`,
            (error, result) => {
                if (error) return res.status(500).send(error);
                return res.status(200).send(result);
            })
    },
    deletePosition: (req, res) => {
        let idposition = req.params.idposition;
        dbConf.query(`Delete from positions where idposition=${idposition}`,
            (error, result) => {
                if (error) return res.status(500).send(error);
                if (!result.affectedRows) return res.status(400).send({ success: false });
                return res.status(200).send({ success: true });
            })
    },
    editPosition: (req, res) => {
        let { position_code, position_name, title_id } = req.body;
        let idposition = req.params.idposition;
        dbConf.query(`Update positions set
        position_code = '${position_code}',
        position_name = '${position_name}',
        title_id = ${title_id}
        where idposition = ${idposition}`,
            (error, result) => {
                if (error) return res.status(500).send(error);
                if (!result.affectedRows) return res.status(400).send({ success: false });
                return res.status(200).send({ success: true });
            })
    },
    addPosition: (req, res) => {
        let { position_code, position_name, title_id } = req.body;
        dbConf.query(`Insert into positions (title_id, position_code, position_name) value (${title_id}, '${position_code}', '${position_name}')`,
            (error, result) => {
                if (error) {
                    console.log(error)
                    return res.status(500).send(error)
                }
                return res.status(200).send({ success: true });
            })
    }
}