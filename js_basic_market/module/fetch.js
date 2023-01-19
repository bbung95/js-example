export const fetchSectionListData = async () => {
    try {
        const result = await fetch("./public/mock/sectionListData.json");
        const data = await result.json();

        return data?.sectionInfoList || [];
    } catch (error) {
        console.log(error);
        return [];
    }
};
