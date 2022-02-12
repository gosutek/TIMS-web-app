if(data.op_ID != null) {
    pm.environment.set("op_ID", data.op_ID);
    pm.environment.set("op1_ID", data.op1_ID);
    pm.environment.set("op2_ID", data.op2_ID);
    pm.environment.set("stationID", data.stationID);
    pm.environment.set("date_from", data.date_from);
    pm.environment.set("date_to", data.date_to);
}