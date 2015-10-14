$(document).ready(function() { 	

	function showDataFromArray(arr)
	{
		var tmpText = "";
		for (var i = 0; i < arr.length; i++) {
			tmpText += arr[i] + " ";
		};
		return tmpText;
	}

		$('#submitBtn').click(function() {
			var packet_data = $('#packetData').val();
			var arr_packet_data = packet_data.split(' ');
			//GET DESTINATION MAC ADDRESS
			var cntDestMAC = 0, cntScrMAC = 0, cntType = 0, cntTotalLngth = 0, cntIdentity = 0, cntFlag = 0, cntHdrChksum = 0, cntScrIP = 0, cntDestIP = 0, cntScrPort = 0, cntDestPort = 0, cntlngth = 0, cntChksum = 0, cntData = 0;
			var destMAC = [], scrMAC = [], type = [], hdrLngth, tos, totalLngth = [], identity = [], flag = [], ttl, protocol, hdrChksum = [], scrIP = [], destIP = [], scrPort = [], destPort = [], lngth = [], chksum = [], data = [];
			for (var i = 0; i < arr_packet_data.length; i++) {
				if (i < 6) {
					destMAC[cntDestMAC++] = arr_packet_data[i];
				}
				else if(i < 12)
				{
					scrMAC[cntScrMAC++] = arr_packet_data[i];
				}
				else if(i < 14)
				{
					type[cntType++] = arr_packet_data[i];
				}
				else if(i < 15)
				{
					hdrLngth = arr_packet_data[i];
				}
				else if(i < 16)
				{
					tos = arr_packet_data[i];
				}
				else if(i < 18)
				{
					totalLngth[cntTotalLngth++] = arr_packet_data[i];
				}
				else if(i < 20)
				{
					identity[cntIdentity++] = arr_packet_data[i];
				}
				else if(i < 22)
				{
					flag[cntFlag++] = arr_packet_data[i];
				}
				else if(i < 23)
				{
					ttl = arr_packet_data[i];
				}
				else if(i < 24)
				{
					protocol = arr_packet_data[i];
				}
				else if(i < 26)
				{
					hdrChksum[cntHdrChksum++] = arr_packet_data[i];
				}
				else if(i < 30)
				{
					scrIP[cntScrIP++] = arr_packet_data[i];
				}
				else if(i < 34)
				{
					destIP[cntDestIP++] = arr_packet_data[i];
				}
				if (protocol == 11) {
					if (i < 36) {
						scrPort[cntScrPort++] = arr_packet_data[i];
					}
					else if (i < 38) {
						destPort[cntDestPort++] = arr_packet_data[i];
					}
					else if (i < 40) {
						lngth[cntlngth++] = arr_packet_data[i];
					}
					else if (i < 42) {
						chksum[cntChksum++] = arr_packet_data[i];
					}
					else
					{
						data[cntData++] = arr_packet_data[i];
					}
				}
			};
			$("#result").append("Destination MAC : " + showDataFromArray(destMAC) + "<br/>");
			$("#result").append("Source MAC : " + showDataFromArray(scrMAC) + "<br/>");
			$("#result").append("Type : " + showDataFromArray(type) + "<br/>");
			$("#result").append("Header Length : " + hdrLngth + "<br/>");
			$("#result").append("Type Of Service : " + tos + "<br/>");
			$("#result").append("Total Length : " + showDataFromArray(totalLngth) + "<br/>");
			$("#result").append("Identification : " + showDataFromArray(identity) + "<br/>");
			$("#result").append("Flag : " + showDataFromArray(flag) + "<br/>");
			$("#result").append("TTL : " + showDataFromArray(ttl) + "<br/>");
			$("#result").append("Protocol : " + showDataFromArray(protocol) + "<br/>");
			$("#result").append("Header Checksum : " + showDataFromArray(hdrChksum) + "<br/>");
			$("#result").append("Source IP : " + showDataFromArray(scrIP) + "<br/>");
			$("#result").append("Destination IP : " + showDataFromArray(destIP) + "<br/>");
			if (protocol == 11) {
				$("#result").append("Source Port : " + showDataFromArray(scrPort) + "<br/>");
				$("#result").append("Destination Port : " + showDataFromArray(destPort) + "<br/>");
				$("#result").append("Length : " + showDataFromArray(lngth) + "<br/>");
				$("#result").append("Checksum : " + showDataFromArray(chksum) + "<br/>");
				$("#result").append("Data : " + showDataFromArray(data) + "<br/>");
			}
		});
});