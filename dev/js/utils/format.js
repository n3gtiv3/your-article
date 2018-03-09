export function formatMoney(n) {
	return n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}
export function formatDate(longDate){
	try{
		var date = new Date(longDate);
		if(isNaN(date.getDate())){
			return "";
		}
		return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
	}catch(e){
		return "";
	}
}
