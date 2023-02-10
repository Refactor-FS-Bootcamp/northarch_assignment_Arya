import React, { useState } from "react";
import { read, utils } from "xlsx";

const Home = () => {
  const [mock, setmock] = useState([]);
  const [edit, setedit] = useState([]);
  const handleImport = (e) => {
    const files = e.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const wb = read(e.target.result);
        const sheets = wb.SheetNames;
        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
        setmock(rows);
      };
      reader.readAsArrayBuffer(file);
    }
  };
  const handleEdit = (event, id) => {
    const newData = [...edit];
    const index = newData.findIndex((item) => item.id === id);
    newData[index][event.target.name] = event.target.value;
    setedit(newData);
  };

  return (
    <>
      <div className="row mb-2 mt-5">
        <div className="col-sm-6 offset-3">
          <div className="row">
            <div className="col-md-6">
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    name="file"
                    className="custom-file-input"
                    id="inputGroupFile"
                    required
                    onChange={handleImport}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile">
                    Choose file
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6 offset-3">
          <table className="table">
            <thead>
              <tr>
                <th> ID</th>
                <th>firstname</th>
                <th>lastname</th>
                <th>email</th>
                <th>gender</th>
              </tr>
            </thead>
            <tbody>
              {mock.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <input
                      type="text"
                      value={data.first_name}
                      onChange={(e) => handleEdit(e, index.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data.last_name}
                      onChange={(e) => handleEdit(e, index.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data.email}
                      onChange={(e) => handleEdit(e, index.id)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={data.gender}
                      onChange={(e) => handleEdit(e, index.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
