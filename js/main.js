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
			$("#result").html('');
			var packet_data = $('#packetData').val();
			var arr_packet_data = packet_data.split(' ');
			//GET DESTINATION MAC ADDRESS
			var cntDestMAC = 0, cntScrMAC = 0, cntType = 0, cntTotalLngth = 0, cntIdentity = 0, cntFlag = 0, cntHdrChksum = 0, cntScrIP = 0, cntDestIP = 0, cntScrPort = 0, cntDestPort = 0, cntlngth = 0, cntChksum = 0, cntData = 0, cntSeqNmbr = 0, cntAckNmbr = 0, cntWndwSze = 0, cntChksumTCP = 0, cntUrgent = 0, cntOption = 0;
			var destMAC = [], scrMAC = [], type = [], hdrLngth, tos, totalLngth = [], identity = [], flag = [], ttl, protocol, hdrChksum = [], scrIP = [], destIP = [], scrPort = [], destPort = [], lngth = [], chksum = [], data = [], seqNmbr = [], ackNmbr = [], hr, flagTCP, wndwSze = [], chksumTCP = [], urgent = [], option = [];
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
				if (protocol == 11 && i >= 34) { //UDP
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
					else {
						data[cntData++] = arr_packet_data[i];
					}
				}
				else if (protocol == 06 && i >= 34) { //TCP
					if (i < 36) {
						scrPort[cntScrPort++] = arr_packet_data[i];
					}
					else if (i < 38) {
						destPort[cntDestPort++] = arr_packet_data[i];
					}
					else if (i < 42) {
						seqNmbr[cntSeqNmbr++] = arr_packet_data[i];
					}
					else if (i < 46) {
						ackNmbr[cntAckNmbr++] = arr_packet_data[i];
					}
					else if (i < 47) {
						hr = arr_packet_data[i];
					}
					else if (i < 48) {
						flagTCP = arr_packet_data[i];
					}
					else if (i < 50) {
						wndwSze[cntWndwSze++] = arr_packet_data[i];
					}
					else if (i < 52) {
						chksumTCP[cntChksumTCP++] = arr_packet_data[i];
					}
					else if (i < 54) {
						urgent[cntUrgent++] = arr_packet_data[i];
					}
					else if (i < 86) {
						option[cntOption++] = arr_packet_data[i];
					}
					else {
						data[cntData++] = arr_packet_data[i];
					}
				}
				else if (protocol == 01 && i >= 34) { //ICMP
					if (i < 35) {
						hr = arr_packet_data[i];
					}
					else if (i < 36) {
						flagTCP = arr_packet_data[i];
					}
					else if (i < 38) {
						chksumTCP[cntChksumTCP++] = arr_packet_data[i];
					}
					else if (i < 40) {
						urgent[cntUrgent++] = arr_packet_data[i];
					}
					else if (i < 42) {
						seqNmbr[cntSeqNmbr++] = arr_packet_data[i];
					}
					else {
						data[cntData++] = arr_packet_data[i];
					}
				}
				else if (protocol == 02 && i >= 34) { //IGMP
					if (i < 35) {
						hr = arr_packet_data[i];
					}
					else if (i < 36) {
						flagTCP = arr_packet_data[i];
					}
					else if (i < 38) {
						chksumTCP[cntChksumTCP++] = arr_packet_data[i];
					}
					else if (i < 42) {
						urgent[cntUrgent++] = arr_packet_data[i];
					}
					else {
						data[cntData++] = arr_packet_data[i];
					}
				}
			};
			$("#result").append("Packet Size : " + arr_packet_data.length + " byte<br/>Destination MAC : " + showDataFromArray(destMAC) + "<br/>");
			$("#result").append("Source MAC : " + showDataFromArray(scrMAC) + "<br/>");
			$("#result").append("Type : " + showDataFromArray(type) + "<br/>");
			$("#result").append("Header Length : " + parseInt(hdrLngth[0]) * parseInt(hdrLngth[1]) + "<br/>");
			$("#result").append("Type Of Service : " + tos + "<br/>");
			$("#result").append("Total Length : " + showDataFromArray(totalLngth) + "<br/>");
			$("#result").append("Identification : " + showDataFromArray(identity) + "<br/>");
			$("#result").append("Flag : " + showDataFromArray(flag) + "<br/>");
			$("#result").append("TTL : " + ttl + "<br/>");
			$("#result").append("Protocol : " + protocol + "<br/>");
			$("#result").append("Header Checksum : " + showDataFromArray(hdrChksum) + "<br/>");
			$("#result").append("Source IP : " + showDataFromArray(scrIP) + "<br/>");
			$("#result").append("Destination IP : " + showDataFromArray(destIP) + "<br/>");
			if (protocol == 11) {
				$("#result").append("Source Port : " + showDataFromArray(scrPort) + "<br/>");
				$("#result").append("Destination Port : " + showDataFromArray(destPort) + "<br/>");
				$("#result").append("Length : " + showDataFromArray(lngth) + "<br/>");
				$("#result").append("Checksum : " + showDataFromArray(chksum) + "<br/>");
			}
			else if (protocol == 06) {
				$("#result").append("Source Port : " + showDataFromArray(scrPort) + "<br/>");
				$("#result").append("Destination Port : " + showDataFromArray(destPort) + "<br/>");
				$("#result").append("Sequence Number : " + showDataFromArray(seqNmbr) + "<br/>");
				$("#result").append("Acknowledgement Number : " + showDataFromArray(ackNmbr) + "<br/>");
				$("#result").append("HR : " + hr + "<br/>");
				$("#result").append("Flag : " + flagTCP + "<br/>");
				$("#result").append("Window Size : " + showDataFromArray(wndwSze) + "<br/>");
				$("#result").append("Checksum : " + showDataFromArray(chksumTCP) + "<br/>");
				$("#result").append("Urgent Pointer : " + showDataFromArray(urgent) + "<br/>");
				$("#result").append("Option : " + showDataFromArray(option) + "<br/>");
			}
			else if (protocol == 01) {
				$("#result").append("Type : " + hr + "<br/>");
				$("#result").append("Code : " + flagTCP + "<br/>");
				$("#result").append("Checksum : " + showDataFromArray(chksumTCP) + "<br/>");
				$("#result").append("Identifier : " + showDataFromArray(urgent) + "<br/>");
				$("#result").append("Sequence Number : " + showDataFromArray(seqNmbr) + "<br/>");
			}
			else if (protocol == 02) {
				$("#result").append("Type : " + hr + "<br/>");
				$("#result").append("Max Response Time : " + flagTCP + "<br/>");
				$("#result").append("IGMP Checksum : " + showDataFromArray(chksumTCP) + "<br/>");
				$("#result").append("Group Address : " + showDataFromArray(urgent) + "<br/>");
			}
			$("#result").append("Data : " + showDataFromArray(data) + "<br/>");
		});
});