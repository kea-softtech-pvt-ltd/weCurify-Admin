import React,{useState,useEffect} from 'react';

export default function Experience (props) {
    const [totalExperience,setTotalExperience] = useState('')
    const experienceData = props.experienceData;
    useEffect(() => {
        let totalExp = 0
        if(experienceData.length > 0) {
            totalExp = manipulateExperience(experienceData)
            const month = totalExp%12
            let year = 0;
            if(totalExp > 11) {
                const exYear = totalExp/12
                year = exYear.toFixed(0)
            }
            const experience = year +"."+ month;
            setTotalExperience(experience);
        } else {
            setTotalExperience("I am a beginner");
        }
    },[props])

    function manipulateExperience(data) {
        let totalExperience = 0;
        data.map(function(item, index){
            const experiences =  monthDiff(new Date(item.startYear), new Date(item.endYear))
            totalExperience = totalExperience + experiences
        })
        return totalExperience;
    }

    function monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months -= d1.getMonth();
        months += d2.getMonth();
        return months <= 0 ? 0 : months;
    }

    return(  
        <div>
        <b>Total Experience : </b>{totalExperience} Year Experience
        </div>
    )
    
}