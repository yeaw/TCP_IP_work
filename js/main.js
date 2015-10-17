$(document).ready(function() { 	

	function showDataFromArray(arr)
	{
		var tmpText = "";
		for (var i = 0; i < arr.length; i++) {
			tmpText += arr[i] + " ";
		};
		return tmpText;
	}

	function binTodec(arr)
	{
		return parseInt(arr, 2).toString(10);
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

	function hardwareType(getType, hrdwreID)
	{
		var tmpHrdwreID = hexTodec(hrdwreID);
		var tmpStr = "";
		if (getType == "06" && tmpHrdwreID == "0") { tmpStr = "(0)reserved"; }
		else if (getType == "35" && tmpHrdwreID == "10") { tmpStr = "(10)Autonet Short Address"; }
		else {
			if (tmpHrdwreID == "1") { tmpStr = "(1)Ethernet"; }
			else if (tmpHrdwreID == "2") { tmpStr = "(2)Experimental Ethernet"; }
			else if (tmpHrdwreID == "3") { tmpStr = "(3)Amateur Radio AX.25"; }
			else if (tmpHrdwreID == "4") { tmpStr = "(4)Proteon ProNET Token Ring"; }
			else if (tmpHrdwreID == "5") { tmpStr = "(5)Chaos"; }
			else if (tmpHrdwreID == "6") { tmpStr = "(6)IEEE 802"; }
			else if (tmpHrdwreID == "7") { tmpStr = "(7)ARCNET"; }
			else if (tmpHrdwreID == "8") { tmpStr = "(8)Hyperchannel"; }
			else if (tmpHrdwreID == "9") { tmpStr = "(9)Lanstar"; }
		}
		return tmpStr;
	}

	function opcodeRequest(getType, opcdeReqID)
	{
		var tmpOpcdeReqID = hexTodec(opcdeReqID);
		var tmpStr = "";
		if (getType == "06" && tmpOpcdeReqID == "0") { tmpStr = "(0)reserved"; }
		else if (getType == "06" && tmpOpcdeReqID == "1") { tmpStr = "(1)Request"; }
		else if (getType == "06" && tmpOpcdeReqID == "2") { tmpStr = "(2)Reply"; }
		else
		{			
			if (tmpOpcdeReqID == "3") { tmpStr = "(3)Request Reverse"; }
			else if (tmpOpcdeReqID == "4") { tmpStr = "(4)Reply Reverse"; }
		}
		return tmpStr;
	}

	function convertDataToIpAddress(arr)
	{
		var tmpBaseBin, tmpBaseDec, tmpStr = "";
		for (var i = 0; i < arr.length; i++) {
			tmpBaseBin = hexTobin(arr[i]);
			tmpBaseDec = binTodec(tmpBaseBin);
			tmpStr += tmpBaseDec;
			if (i < (arr.length - 1)) { tmpStr += "."; }
		}
		return tmpStr;
	}

		$("input[value='udp']").prop("checked", true)
	    $("input:radio").click(function () {
	        if ($(this).attr("value") == "udp") {
	            $('#packetData').val("00 24 8C 01 79 08 00 24 8C 01 79 06 08 00 45 20 00 3C 16 DB 00 00 3F 11 CC 8A D5 E9 AB 0A 5E B6 B8 8C 05 57 90 1F 90 30 93 71 75 F5 DB BA A0 12 16 28 EF E6 00 00 02 04 05 96 04 02 08 0A 59 70 9A 08 2D DE 7D 72 01 03 03 06");
	        }
	        else if ($(this).attr("value") == "tcp") {
	            $('#packetData').val("00 24 8C 01 79 08 00 24 8C 01 79 06 08 00 45 20 00 3C 16 DB 00 00 3F 06 CC 8A D5 E9 AB 0A 5E B6 B8 8C 05 57 90 1F 90 30 93 71 75 F5 DB BA 45 18 16 28 EF E6 00 00 02 04 05 96 04 02 08 0A 59 70 9A 08 2D DE 7D 72 01 03 03 06");
	        }
	        else if ($(this).attr("value") == "icmp") {
	            $('#packetData').val("00 24 8C 01 79 08 00 24 8C 01 79 06 08 00 45 20 00 3C 16 DB 00 00 3F 01 CC 8A D5 E9 AB 0A 5E B6 B8 8C 06 57 90 1F 90 30 93 71 75 F5 DB BA A0 12 16 28 EF E6 00 00 02 04 05 96 04 02 08 0A 59 70 9A 08 2D DE 7D 72 01 03 03 06");
	        }
	        else if ($(this).attr("value") == "igmp") {
	            $('#packetData').val("00 24 8C 01 79 08 00 24 8C 01 79 06 08 00 45 20 00 3C 16 DB 00 00 3F 02 CC 8A D5 E9 AB 0A 5E B6 B8 8C 08 57 90 1F 90 30 93 71 75 F5 DB BA A0 12 16 28 EF E6 00 00 02 04 05 96 04 02 08 0A 59 70 9A 08 2D DE 7D 72 01 03 03 06");
	        }
	        else if ($(this).attr("value") == "arp") {
	            $('#packetData').val("00 24 8C 01 79 08 00 24 8C 01 79 06 08 06 00 00 00 3C 16 DB 00 02 3F 11 CC 8A D5 E9 AB 0A 5E B6 B8 8C 05 57 90 1F 90 30 93 71 75 F5 DB BA A0 12 16 28 EF E6 00 00 02 04 05 96 04 02 08 0A 59 70 9A 08 2D DE 7D 72 01 03 03 06");
	        }
	        else 
	            $('#packetData').val("00 24 8C 01 79 08 00 24 8C 01 79 06 08 35 00 0A 00 3C 16 DB 00 03 3F 11 CC 8A D5 E9 AB 0A 5E B6 B8 8C 05 57 90 1F 90 30 93 71 75 F5 DB BA A0 12 16 28 EF E6 00 00 02 04 05 96 04 02 08 0A 59 70 9A 08 2D DE 7D 72 01 03 03 06");
	    }); 

		$('.nav-tabs-dropdown').each(function(i, elm) { 
    		$(elm).text($(elm).next('ul').find('li.active a').text());    
		});  
			$('.nav-tabs-dropdown').on('click', function(e) {
   				 e.preventDefault();  
    		$(e.target).toggleClass('open').next('ul').slideToggle();    
		});
		$('#nav-tabs-wrapper a[data-toggle="tab"]').on('click', function(e) {
   			 e.preventDefault();
    		$(e.target).closest('ul').hide().prev('a').removeClass('open').text($(this).text());
      
		});
		$('#submitBtn').click(function() {
			$("#pan").removeClass('hide');
			$("#result").html('');
			var packet_data = $('#packetData').val();
			var arr_packet_data = packet_data.split(' ');
			var cntDestMAC = 0, cntScrMAC = 0, cntType = 0, cntTotalLngth = 0, cntIdentity = 0, cntFlag = 0, cntHdrChksum = 0, cntScrIP = 0, cntDestIP = 0, cntScrPort = 0, cntDestPort = 0, cntlngth = 0, cntChksum = 0, cntData = 0, cntSeqNmbr = 0, cntAckNmbr = 0, cntWndwSze = 0, cntChksumTCP = 0, cntUrgent = 0, cntOption = 0, cntHrdwreType = 0, cntPrtclType = 0, cntOpcdeRqst = 0, cntSndrMacAddrss = 0, cntSndrIpAddrss = 0, cntTrgtMacAddrss = 0, cntTrgtIpAddrss = 0;
			var destMAC = [], scrMAC = [], type = [], hdrLngth, tos, totalLngth = [], identity = [], flag = [], ttl, protocol, hdrChksum = [], scrIP = [], destIP = [], scrPort = [], destPort = [], lngth = [], chksum = [], data = [], seqNmbr = [], ackNmbr = [], hr, flagTCP, wndwSze = [], chksumTCP = [], urgent = [], option = [], hrdwreType = [], prtclType = [], hrdwreSize, prtclSize, opcdeRqst = [], sndrMacAddrss = [], sndrIpAddrss = [], trgtMacAddrss = [], trgtIpAddrss = [];
			var tmpResult = "<div class='table-responsive'><table class='table table-bordered'><thead><tr><th>##</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th></tr></thead><tbody>";
			var numTrDivide = parseInt(arr_packet_data.length) / 16;
			var numTrMod = parseInt(arr_packet_data.length) % 16;
			var numTr = 16 - numTrMod;
			if (numTrMod > 0) {
				for (var i = (numTrDivide*16); i < ((numTrDivide*16) + numTr); i++) {
					arr_packet_data[i] = "";
				}
			}
			for (var i = 0, cnt = 1; i < arr_packet_data.length; i = i + 16, cnt++) {
				tmpResult += "<tr><td>00" + (cnt*10) + "</td><td>" + arr_packet_data[i] + "</td><td>" + arr_packet_data[i+1] + "</td><td>" + arr_packet_data[i+2] + "</td><td>" + arr_packet_data[i+3] + "</td><td>" + arr_packet_data[i+4] + "</td><td>" + arr_packet_data[i+5] + "</td><td>" + arr_packet_data[i+6] + "</td><td>" + arr_packet_data[i+7] + "</td><td>" + arr_packet_data[i+8] + "</td><td>" + arr_packet_data[i+9] + "</td><td>" + arr_packet_data[i+10] + "</td><td>" + arr_packet_data[i+11] + "</td><td>" + arr_packet_data[i+12] + "</td><td>" + arr_packet_data[i+13] + "</td><td>" + arr_packet_data[i+14] + "</td><td>" + arr_packet_data[i+15] + "</td></tr>";	
			}
			tmpResult += "</tbody></table></div><br/>";
			$("#result").append(tmpResult);
			for (var i = 0; i < arr_packet_data.length; i++) {
				if (arr_packet_data[13] == "00") { //UDP TCP ICMP IGMP
					if (i < 6) { destMAC[cntDestMAC++] = arr_packet_data[i]; }
					else if(i < 12) { scrMAC[cntScrMAC++] = arr_packet_data[i]; }
					else if(i < 14) { type[cntType++] = arr_packet_data[i]; }
					else if(i < 15) { hdrLngth = arr_packet_data[i]; }
					else if(i < 16) { tos = arr_packet_data[i]; }
					else if(i < 18) { totalLngth[cntTotalLngth++] = arr_packet_data[i]; }
					else if(i < 20) { identity[cntIdentity++] = arr_packet_data[i]; }
					else if(i < 22) { flag[cntFlag++] = arr_packet_data[i]; }
					else if(i < 23) { ttl = arr_packet_data[i]; }
					else if(i < 24) { protocol = arr_packet_data[i]; }
					else if(i < 26) { hdrChksum[cntHdrChksum++] = arr_packet_data[i]; }
					else if(i < 30) { scrIP[cntScrIP++] = arr_packet_data[i]; }
					else if(i < 34) { destIP[cntDestIP++] = arr_packet_data[i]; }
				}
				else { //ARP & RARP
					if (i < 6) { destMAC[cntDestMAC++] = arr_packet_data[i]; }
					else if(i < 12) { scrMAC[cntScrMAC++] = arr_packet_data[i]; }
					else if(i < 14) { type[cntType++] = arr_packet_data[i]; }
					else if(i < 16) { hrdwreType[cntHrdwreType++] = arr_packet_data[i]; }
					else if(i < 18) { prtclType[cntPrtclType++] = arr_packet_data[i]; }
					else if(i < 19) { hrdwreSize = arr_packet_data[i]; }
					else if(i < 20) { prtclSize = arr_packet_data[i]; }
					else if(i < 22) { opcdeRqst[cntOpcdeRqst++] = arr_packet_data[i]; }
					else if(i < 28) { sndrMacAddrss[cntSndrMacAddrss++] = arr_packet_data[i]; }
					else if(i < 32) { sndrIpAddrss[cntSndrIpAddrss++] = arr_packet_data[i]; }
					else if(i < 38) { trgtMacAddrss[cntTrgtMacAddrss++] = arr_packet_data[i]; }
					else if(i < 42) { trgtIpAddrss[cntTrgtIpAddrss++] = arr_packet_data[i]; }
				}
				if (arr_packet_data[13] == "00" && protocol == 11 && i >= 34) { //UDP
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
				else if (arr_packet_data[13] == "00" && protocol == 06 && i >= 34) { //TCP
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
				else if (arr_packet_data[13] == "00" && protocol == 01 && i >= 34) { //ICMP
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
				else if (arr_packet_data[13] == "00" && protocol == 02 && i >= 34) { //IGMP
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
			if (arr_packet_data[13] == "00") {
				$("#result").append("Version : " + hdrLngth[0] + "<br/>");
				$("#result").append("Header Length : " + parseInt(hdrLngth[0]) * parseInt(hdrLngth[1]) + "<br/>");
				$("#result").append("Type Of Service : " + tos + "<br/>");
				$("#result").append("Total Length : " + hexTodec(totalLngth) + "<br/>");
				$("#result").append("Identification : 0x" + identity[0]+identity[1] +" ("+ hexTodec(identity)+ ")<br/>");
				$("#result").append("Flag : " + showDataFromArray(flag) + "<br/>");
				$("#result").append("TTL : " + hexTodec(ttl) + "<br/>");
				$("#result").append("Protocol : " + hexTodec(protocol) + "<br/>");
				$("#result").append("Header Checksum : " + showDataFromArray(hdrChksum) + "<br/>");
				$("#result").append("Source IP : " + convertDataToIpAddress(scrIP) + "<br/>");
				$("#result").append("Destination IP : " + convertDataToIpAddress(destIP) + "<br/>");
				if (protocol == 11) {
					$("#result").append("Source Port : " + hexTodec(scrPort) + "<br/>");
					$("#result").append("Destination Port : " + hexTodec(destPort) + "<br/>");
					$("#result").append("Length : " + hexTodec(lngth) + "<br/>");
					$("#result").append("Checksum : " + showDataFromArray(chksum) + "<br/>");
				}
				else if (protocol == 06) {
					$("#result").append("Source Port : " + hexTodec(scrPort) + "<br/>");
					$("#result").append("Destination Port : " + hexTodec(destPort) + "<br/>");
					$("#result").append("Sequence Number : " + hexTodec(seqNmbr) + "<br/>");
					$("#result").append("Acknowledgement Number : " + hexTodec(ackNmbr) + "<br/>");
					$("#result").append("Header Length : " + (parseInt(hexTodec(hr[0]))*4) + "<br/>");
					$("#result").append("Reserved : " + hexTobin(hr[1]).substring(0, 3) + "<br/>");
					$("#result").append("Nonce : " + hexTobin(hr[1]).substring(3, 4) + "<br/>");
					$("#result").append("Flag : 0x0" + flagTCP + showFlagTCP(flagTCP));
					$("#result").append("Window Size : " + hexTodec(wndwSze) + "<br/>");
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
			}
			else
			{
				$("#result").append("Hardware Type : " + hardwareType(arr_packet_data[13], hrdwreType) + "<br/>");
				$("#result").append("Protocol Type : 0x" + prtclType[0] + prtclType[1] + "<br/>");
				$("#result").append("Hardware Size : " + hrdwreSize + "<br/>");
				$("#result").append("Protocol Size : " + prtclSize + "<br/>");
				$("#result").append("Opcode Request : " + opcodeRequest(arr_packet_data[13], opcdeRqst) + "<br/>");
				$("#result").append("Sender MAC Address : " + showDataFromArray(sndrMacAddrss) + "<br/>");
				$("#result").append("Sender IP Address : " + convertDataToIpAddress(sndrIpAddrss) + "<br/>");
				$("#result").append("Targus MAC Address : " + showDataFromArray(trgtMacAddrss) + "<br/>");
				$("#result").append("Targus IP Address : " + convertDataToIpAddress(trgtIpAddrss) + "<br/>");
			}


		});
});