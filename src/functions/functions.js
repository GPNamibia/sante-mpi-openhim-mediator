const remove_health_id = function(obj)
  {
    var jsonData = [];
    Object.keys(obj).forEach(key => {
        if (key == 'identifier'){
            const ident_obj = obj[key];
            Object.keys(ident_obj).forEach(ident_key => {
                var columnName = ident_obj[ident_key]['system'];
                if (columnName != 'http://ohie.org/Health_ID'){
                    jsonData.push(ident_obj[ident_key]); 
                }
            });
            obj[key] = jsonData;
        }
    });
    return obj;
  }


  const alter_patient_resource = function(obj, type)
  {
    var jsonData = [];

    if (type == 'add_system'){
        Object.keys(obj).forEach(key => {
            if (key == 'identifier'){
                const ident_obj = obj[key];
                Object.keys(ident_obj).forEach(ident_key => {
                    var columnName = ident_obj[ident_key]['system'];
                    jsonData[columnName] = ident_obj[ident_key]; 
                });
                obj[key] = jsonData;
    
            }
        });
    }
    else{
        Object.keys(obj).forEach(key => {
            if (key == 'identifier'){
                const ident_obj = obj[key];
                Object.keys(ident_obj).forEach(ident_key => {
                    jsonData.push(ident_obj[ident_key]); 
                });
                obj[key] = jsonData; 
            }
        });
    }
    return obj;
  }

  module.exports = {
    remove_health_id,
    alter_patient_resource
  }