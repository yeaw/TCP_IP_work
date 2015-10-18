$(document).ready(function() { 	

	function showDataFromArray(arr)
	{
		var tmpText = "";
		for (var i = 0; i < arr.length; i++) {
			tmpText += arr[i] + " ";
		};
		return tmpText;
	}
	function showDataToMAC(arr)
	{
		var tmpText = "";
		for (var i = 0; i < arr.length ; i++) {
			tmpText += arr[i] ;
			if(i == arr.length-1 ){
					tmpText += "";
			}else{
				tmpText +=":";
			}
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

	function showFlagTCP(arr,rss,ncc)
	{
		var arrBin = hexTobin(arr);
		var status = "", tmpStr = "", name = "";
		for (var i = 0; i < arrBin.length; i++) {
			if (arrBin[i] == '0') { status = "not set"; }
			else { status = "set"; }
			if (i < 1) { tmpStr += "<strong>Congestion window Reduce</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "CWR"; } else { name += "+CWR"; } } }
			else if (i < 2) { tmpStr += "<strong>ECN-Echo</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "ECN"; } else { name += "+ECN"; } } }
			else if (i < 3) { tmpStr += "<strong>Urgent</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "URG"; } else { name += "+URG"; } } }
			else if (i < 4) { tmpStr += "<strong>Acknowledgement</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "ACK"; } else { name += "+ACK"; } } }
			else if (i < 5) { tmpStr += "<strong>Push</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "PSH"; } else { name += "+PSH"; } } }
			else if (i < 6) { tmpStr += "<strong>Reset</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "RST"; } else { name += "+RST"; } } }
			else if (i < 7) { tmpStr += "<strong>Syn</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "SYN"; } else { name += "+SYN"; } } }
			else if (i < 8) { tmpStr += "<strong>Fin</strong> : "; if (arrBin[i] == '1') { if (name == "") { name = "FIN"; } else { name += "+FIN"; } } }
			tmpStr += status + "(" + arrBin[i] + ")<br/>";
		};
		return "(" + name + ")<br/>"+" <strong>Reserved :</strong>"+rss+"<br/>" +"<strong>Nonce :</strong> "+ncc+"<br/>"  + tmpStr;
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
///////////////////////////////////////////////////////////////////////////////////
		$('.nav-tabs-dropdown').each(function(i, elm) { 
    		$(elm).text($(elm).next('ul').find('li.active a').text());    
		});  
			$('.nav-tabs-dropdown').on('click', function(e) {
   				 e.preventDefault();  
    		$(e.target).toggleClass('open').next('ul').slideToggle();    
		});
///////////////////////////////////////////////////////////////////////////////////
$(function () {
    $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Expand this branch');
 	$('li.parent_li > ul >li').hide('fast');;
  

    $('.tree li.parent_li > span').on('click', function (e) {
        var children = $(this).parent('li.parent_li').find(' > ul > li');
        
        if (children.is(":visible")) {
            children.hide('fast');
            $(this).attr('title', 'Expand this branch').find(' > i').addClass('fa-plus-square').removeClass('fa-minus-square');
        } else {
            children.show('fast');
            $(this).attr('title', 'Collapse this branch').find(' > i').addClass('fa-minus-square').removeClass('fa-plus-square');
        }
        e.stopPropagation();
    });
});

///////////////////////////////////////////////////////////////////////////////////
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
			$("#result").append("<strong>Packet Size :</strong> " + arr_packet_data.length + " byte <hr> <h4><u>Ethernet II</u></h4><strong>Destination MAC :</strong> " + showDataToMAC(destMAC) + "<br/>");
			$("#result").append("<strong>Source MAC :</strong> " + showDataToMAC(scrMAC) + "<br/>");
			$("#result").append("<strong>Type :</strong> 0x" + type[0] + type[1] + "<hr>");
			if (arr_packet_data[13] == "00") {
				$("#result").append("<h4><u>Internet Protocol Version 4</u></h4> <strong>Version : </strong>" + hdrLngth[0] + "<br/>");
				$("#result").append("<strong>Header Length :</strong> " + parseInt(hdrLngth[0]) * parseInt(hdrLngth[1]) + "<br/>");
				$("#result").append("<strong>Type Of Service :</strong> " + tos + "<br/>");
				$("#result").append("<strong>Total Length :</strong> " + hexTodec(totalLngth) + "<br/>");
				$("#result").append("<strong>Identification :</strong> 0x" + identity[0]+identity[1] +" ("+ hexTodec(identity)+ ")<br/>");
				$("#result").append("<strong>Flag :</strong> " + showDataFromArray(flag) + "<br/>");
				$("#result").append("<strong>TTL :</strong> " + hexTodec(ttl) + "<br/>");
				$("#result").append("<strong>Protocol :</strong> " + hexTodec(protocol) + "<br/>");
				$("#result").append("<strong>Header Checksum :</strong> " + showDataFromArray(hdrChksum) + "<br/>");
				$("#result").append("<strong>Source IP :</strong> " + convertDataToIpAddress(scrIP) + "<br/>");
				$("#result").append("<strong>Destination IP :</strong> " + convertDataToIpAddress(destIP) + "<hr>");
				if (protocol == 11) {
					$("#result").append("<h4><u>User Datagram Protocol</u></h4><strong>Source Port :</strong> " + hexTodec(scrPort) + "<br/>");
					$("#result").append("<strong>Destination Port :</strong> " + hexTodec(destPort) + "<br/>");
					$("#result").append("<strong>Length :</strong> " + hexTodec(lngth) + "<br/>");
					$("#result").append("<strong>Checksum :</strong> " + showDataFromArray(chksum) + "<br/>");
				}
				else if (protocol == 06) {
					$("#result").append("<h4><u>Transmission Control Protocol</u></h4><strong>Source Port :</strong> " + hexTodec(scrPort) + "<br/>");
					$("#result").append("<strong>Destination Port :</strong> " + hexTodec(destPort) + "<br/>");
					$("#result").append("<strong>Sequence Number :</strong> " + hexTodec(seqNmbr) + "<br/>");
					$("#result").append("<strong>Acknowledgement Number :</strong> " + hexTodec(ackNmbr) + "<br/>");
					$("#result").append("<strong>Header Length :</strong>" + (parseInt(hexTodec(hr[0]))*4) + "<br/>");
					var rs = hexTobin(hr[1]).substring(0, 3);
					var nc = hexTobin(hr[1]).substring(3, 4);
					//$("#result").append("<strong>Reserved : " + hexTobin(hr[1]).substring(0, 3) + "<br/>");
					//$("#result").append("<strong>Nonce :</strong> " + hexTobin(hr[1]).substring(3, 4) + "<br/>");
					$("#result").append("<strong>Flag :</strong> 0x0" + flagTCP + showFlagTCP(flagTCP,rs,nc));
					$("#result").append("<strong>Window Size : " + hexTodec(wndwSze) + "<br/>");
					$("#result").append("<strong>Checksum :</strong> " + showDataFromArray(chksumTCP) + "<br/>");
					$("#result").append("<strong>Urgent Pointer :</strong> " + showDataFromArray(urgent) + "<br/>");
					$("#result").append("<strong>Option :</strong> " + showDataFromArray(option) + "<br/>");
				}
				else if (protocol == 01) {
					$("#result").append("<h4><u>Internet Control Message Protocol </u></h4><strong>Type :</strong> " + typeICMP(hr) + "<br/>");
					$("#result").append("<strong>Code :</strong> " + flagTCP + "<br/>");
					$("#result").append("<strong>Checksum :</strong> " + showDataFromArray(chksumTCP) + "<br/>");
					$("#result").append("<strong>Identifier :</strong> " + showDataFromArray(urgent) + "<br/>");
					$("#result").append("<strong>Sequence Number :</strong> " + showDataFromArray(seqNmbr) + "<br/>");
				}
				else if (protocol == 02) { 
					$("#result").append("<h4><u>Internet Group Management Protocol</u></h4><strong>Type :</strong> " + typeIGMP(hr) + "<br/>");
					$("#result").append("<strong>Max Response Time :</strong> " + flagTCP + "<br/>");
					$("#result").append("<strong>IGMP Checksum :</strong> " + showDataFromArray(chksumTCP) + "<br/>");
					$("#result").append("<strong>Group Address :</strong> " + showDataFromArray(urgent) + "<br/>");
				}
				$("#result").append("<strong>Data : </strong>" + showDataFromArray(data) + "<br>");
			}
			else
			{
				var ttype = type[0] + type[1] ;
				if(ttype == "0806")
				{
					$("#result").append("<h4><u>Address Resolution Protocol </u></h4>");
				}else if (ttype == "0835")
				{
					$("#result").append("<h4><u>Reverse Address Resolution Protocol</u></h4>");
				}

				$("#result").append("<strong>Hardware Type</strong> : " + hardwareType(arr_packet_data[13], hrdwreType) + "<br/>");
				$("#result").append("<strong>Protocol Type</strong> : 0x" + prtclType[0] + prtclType[1] + "<br/>");
				$("#result").append("<strong>Hardware Size</strong> : " + hrdwreSize + "<br/>");
				$("#result").append("<strong>Protocol Size</strong> : " + prtclSize + "<br/>");
				$("#result").append("<strong>Opcode Request</strong> : " + opcodeRequest(arr_packet_data[13], opcdeRqst) + "<br/>");
				$("#result").append("<strong>Sender MAC Address</strong> : " + showDataToMAC(sndrMacAddrss) + "<br/>");
				$("#result").append("<strong>Sender IP Address </strong> : " + convertDataToIpAddress(sndrIpAddrss) + "<br/>");
				$("#result").append("<strong>Target MAC Address</strong> : " + showDataToMAC(trgtMacAddrss) + "<br/>");
				$("#result").append("<strong>Target IP Address</strong> : " + convertDataToIpAddress(trgtIpAddrss) + "<br/>");
			}


		});
});