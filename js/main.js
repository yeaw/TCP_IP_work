$(document).ready(function() { 	

	function showDataFromArray(arr)
	{
		var tmpText = "";
		for (var i = 0; i < arr.length; i++) {
			tmpText += arr[i] + " ";
		};
		return tmpText;
	}

	function hexTodec(arr)
	{
		var tmpShow = "";
		for (var i = 0; i < arr.length; i++) {
			tmpShow += arr[i];
		};
		return parseInt(tmpShow, 16);
	}

	function hexTobin(arr)
	{
		var tmpShow = "", tmpZero = "";
		for (var i = 0; i < arr.length; i++) {
			tmpShow += arr[i];
		};
		tmpShow = parseInt(tmpShow,16).toString(2);
		if (tmpShow.length % 4 > 0) {
			if(tmpShow.length < 4) {
				for (var i = 0; i < (4-tmpShow.length); i++) {
					tmpZero += "0";
				};
			}
			else if(tmpShow.length > 4)
			{
				for (var i = 0; i < (8-tmpShow.length); i++) {
					tmpZero += "0";
				};				
			}
			tmpShow = tmpZero + tmpShow;
		}
		return tmpShow;
	}

	function showFlagTCP(arr)
	{
		var arrBin = hexTobin(arr);
		var status = "", tmpStr = "", name = "";
		for (var i = 0; i < arrBin.length; i++) {
			if (arrBin[i] == '0') { status = "not set"; }
			else { status = "set"; }
			if (i < 1) { tmpStr += "Congestion window Reduce : "; if (arrBin[i] == '1') { if (name == "") { name = "CWR"; } else { name += "+CWR"; } } }
			else if (i < 2) { tmpStr += "ECN-Echo : "; if (arrBin[i] == '1') { if (name == "") { name = "ECN"; } else { name += "+ECN"; } } }
			else if (i < 3) { tmpStr += "Urgent : "; if (arrBin[i] == '1') { if (name == "") { name = "URG"; } else { name += "+URG"; } } }
			else if (i < 4) { tmpStr += "Acknowledgement : "; if (arrBin[i] == '1') { if (name == "") { name = "ACK"; } else { name += "+ACK"; } } }
			else if (i < 5) { tmpStr += "Push : "; if (arrBin[i] == '1') { if (name == "") { name = "PSH"; } else { name += "+PSH"; } } }
			else if (i < 6) { tmpStr += "Reset : "; if (arrBin[i] == '1') { if (name == "") { name = "RST"; } else { name += "+RST"; } } }
			else if (i < 7) { tmpStr += "Syn : "; if (arrBin[i] == '1') { if (name == "") { name = "SYN"; } else { name += "+SYN"; } } }
			else if (i < 8) { tmpStr += "Fin : "; if (arrBin[i] == '1') { if (name == "") { name = "FIN"; } else { name += "+FIN"; } } }
			tmpStr += status + "(" + arrBin[i] + ")<br/>";
		};
		return "(" + name + ")<br/>" + tmpStr;
	}

	function typeICMP(val)
	{
		var numType = hexTodec(val);
		var tmpStr = "";
		if (numType == 0) { tmpStr = "Echo reply"; }
		else if (numType == 3) { tmpStr = "(3)Destination unreachable"; }
		else if (numType == 4) { tmpStr = "(4)Source quench"; }
		else if (numType == 5) { tmpStr = "(5)Redirect"; }
		else if (numType == 6) { tmpStr = "(6)Alternate host address"; }
		else if (numType == 8) { tmpStr = "(8)Echo request"; }
		else if (numType == 9) { tmpStr = "(9)Router advertisement"; }
		else if (numType == 10) { tmpStr = "(10)Router solicitation"; }
		else if (numType == 11) { tmpStr = "(11)Time exceeded"; }
		else if (numType == 12) { tmpStr = "(12)Parameter problem"; }
		else if (numType == 13) { tmpStr = "(13)Timestamp request"; }
		else if (numType == 14) { tmpStr = "(14)Timestamp reply"; }
		else if (numType == 15) { tmpStr = "(15)Information request. Obsolete."; }
		else if (numType == 16) { tmpStr = "(16)Information reply. Obsolete."; }
		else if (numType == 17) { tmpStr = "(17)Address mask request"; }
		else if (numType == 18) { tmpStr = "(18)Address mask reply"; }
		return tmpStr;
	}

	function typeIGMP(val)
	{
		var numType = hexTodec(val);
		var tmpStr = "";
		if (numType == 1) { tmpStr = "(1)Create Group Request"; }
		else if (numType == 2) { tmpStr = "(2)Create Group Reply"; }
		else if (numType == 3) { tmpStr = "(3)Join Group Request"; }
		else if (numType == 4) { tmpStr = "(4)Join Group Reply"; }
		else if (numType == 5) { tmpStr = "(5)Leave Group Request"; }
		else if (numType == 6) { tmpStr = "(6)Leave Group Reply"; }
		else if (numType == 7) { tmpStr = "(7)Confirm Group Request"; }
		else if (numType == 8) { tmpStr = "(8)Confirm Group Reply"; }
		return tmpStr;
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
			$("#result").append("Type : 0x" + type[0] + type[1] + "<br/>");
			$("#result").append("Version : " + hdrLngth[0] + "<br/>");
			$("#result").append("Header Length : " + parseInt(hdrLngth[0]) * parseInt(hdrLngth[1]) + "<br/>");
			$("#result").append("Type Of Service : " + tos + "<br/>");
			$("#result").append("Total Length : " + hexTodec(totalLngth) + "<br/>");
			$("#result").append("Identification : " + showDataFromArray(identity) + "<br/>");
			$("#result").append("Flag : " + showDataFromArray(flag) + "<br/>");
			$("#result").append("TTL : " + hexTodec(ttl) + "<br/>");
			$("#result").append("Protocol : " + hexTodec(protocol) + "<br/>");
			$("#result").append("Header Checksum : " + showDataFromArray(hdrChksum) + "<br/>");
			$("#result").append("Source IP : " + hexTodec(scrIP) + "<br/>");
			$("#result").append("Destination IP : " + hexTodec(destIP) + "<br/>");
			if (protocol == 11) {
				$("#result").append("Source Port : " + hexTodec(scrPort) + "<br/>");
				$("#result").append("Destination Port : " + hexTodec(destPort) + "<br/>");
				$("#result").append("Length : " + hexTodec(lngth) + "<br/>");
				$("#result").append("Checksum : " + showDataFromArray(chksum) + "<br/>");
			}
			else if (protocol == 06) {
				$("#result").append("Source Port : " + hexTodec(scrPort) + "<br/>");
				$("#result").append("Destination Port : " + hexTodec(destPort) + "<br/>");
				$("#result").append("Sequence Number : " + showDataFromArray(seqNmbr) + "<br/>");
				$("#result").append("Acknowledgement Number : " + showDataFromArray(ackNmbr) + "<br/>");
				$("#result").append("Header Length : " + hexTodec(hr[0]) + "<br/>");
				$("#result").append("Reserved : " + hexTobin(hr[1]).substring(0, 3) + "<br/>");
				$("#result").append("Nonce : " + hexTobin(hr[1]).substring(3, 4) + "<br/>");
				$("#result").append("Flag : 0x0" + flagTCP + showFlagTCP(flagTCP));
				$("#result").append("Window Size : " + showDataFromArray(wndwSze) + "<br/>");
				$("#result").append("Checksum : " + showDataFromArray(chksumTCP) + "<br/>");
				$("#result").append("Urgent Pointer : " + showDataFromArray(urgent) + "<br/>");
				$("#result").append("Option : " + showDataFromArray(option) + "<br/>");
			}
			else if (protocol == 01) {
				$("#result").append("Type : " + typeICMP(hr) + "<br/>");
				$("#result").append("Code : " + flagTCP + "<br/>");
				$("#result").append("Checksum : " + showDataFromArray(chksumTCP) + "<br/>");
				$("#result").append("Identifier : " + showDataFromArray(urgent) + "<br/>");
				$("#result").append("Sequence Number : " + showDataFromArray(seqNmbr) + "<br/>");
			}
			else if (protocol == 02) {
				$("#result").append("Type : " + typeIGMP(hr) + "<br/>");
				$("#result").append("Max Response Time : " + flagTCP + "<br/>");
				$("#result").append("IGMP Checksum : " + showDataFromArray(chksumTCP) + "<br/>");
				$("#result").append("Group Address : " + showDataFromArray(urgent) + "<br/>");
			}
			$("#result").append("Data : " + showDataFromArray(data) + "<br/>");
		});
});