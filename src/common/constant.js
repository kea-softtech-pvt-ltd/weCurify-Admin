const constants ={
    VIEWDOCTOR_DATA: "../data/viewdoctor.json",
    PATIENTLIST_DATA: "../data/patientlist.json",
    // OPDSCREEN_DATA:"../data/opdscreen.json",
    MEDICINELIST_DATA:"../data/medicinelist.json",
    MEDICINEWEIGHT_DATA:"../data/medicineWeight.json",
    SLOTOFDAYS_DATA:"../data/slotOfDays.json",
    PATIENTINFO_DATA:"../data/patientInfo.json",
    PATIENTPAYMENT_DATA:"../data/patientpayment.json",
    SLIDER_DATA:"../data/silder.json",
    MEAL_DATA:"./data/Meal.json"
}
export const slots = [
    {
      date:"ToDay",
      slot: "8 slots available",
      time:"12.00"
    },
    {
      date: "Tomorrow",
      slot: "9 slots available",
      time:"12.30",
    },
    {
      date:"Sat 16 Oct",
      slot: "7 slots available",
      time:"2.00"
    },
    {
      date:"Mon 18 Oct",
      slot: "8 slots available",
      time:"2.30"
    },
    {
        date:"Tue 19 Oct",
        slot: "8 slots available",
        time:"3.00"
    },
    {
        date:"Wed 20 Oct",
        slot: "4 slots available",
        time:"3.30"
    },
    {
        date:"Thu 21 Oct",
        slot: "8 slots available",
        time:"4.00"
    },
    {
      time:"4.30"
    }
];


export default constants;