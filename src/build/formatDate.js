export default function(dateObject) {
    let dateStr = ""

    if (!dateObject)
        return ""

    if (dateObject.year) {
        if (dateObject.month) {
            dateStr = dateObject.date
                ? `${dateObject.month}/${dateObject.date}/${dateObject.year}`
                : `${dateObject.month}/${dateObject.year}`
        }
        else if (dateObject.descriptor)
            dateStr = `${dateObject.descriptor} ${dateObject.year}`
    }
    else if (dateObject.descriptor)
        dateStr = dateObject.descriptor

    return dateStr;
}