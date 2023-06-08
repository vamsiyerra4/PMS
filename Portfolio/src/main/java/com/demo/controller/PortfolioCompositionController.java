package com.demo.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.demo.dto.PortfolioCompositionDto;
import com.demo.exception.DataNotFoundException;
import com.demo.model.Asset;
import com.demo.model.Master;
import com.demo.model.PortfolioComposition;
import com.demo.model.PortfolioHeader;
import com.demo.model.ThemeAsset;
import com.demo.repository.AssetRepo;
import com.demo.repository.MasterRepo;
import com.demo.repository.PortfolioCompositionRepo;
import com.demo.repository.PortfolioHeaderRepo;
import com.demo.service.PortfolioCompositionService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/compo")
public class PortfolioCompositionController {

	@Autowired
	PortfolioCompositionService service;

	@Autowired
	PortfolioCompositionRepo portfolioCompositionRepo;

	@Autowired
	PortfolioHeaderRepo repo;

	@Autowired
	MasterRepo masterRepo;
	@Autowired
	AssetRepo assetRepo;
	public static double totalTransaction;

	@PostMapping("/addCompo/{portfolioName}/{assetId}/{symbol}")
	public ResponseEntity<String> addCompo(@RequestBody PortfolioComposition portfolioComposition,
			@PathVariable("portfolioName") String portfolioName,@PathVariable ("assetId") String assetId, @PathVariable("symbol") String symbol) {

		Optional<PortfolioHeader> optional = repo.findById(portfolioName);
		if (!optional.isPresent())
			return new ResponseEntity<>("Invalid portfolio", HttpStatus.BAD_REQUEST);

		PortfolioHeader portfolioHeader = optional.get();
		portfolioComposition.setPortfolioHeader(portfolioHeader);

		Optional<Asset> optionalA = assetRepo.findById(assetId);
		if (!optionalA.isPresent())
			return new ResponseEntity<>("Invalid Asset", HttpStatus.BAD_REQUEST);
		Asset asset = optionalA.get();
		portfolioComposition.setAsset(asset);

		Optional<Master> optionalM = masterRepo.findById(symbol);
		if (!optionalM.isPresent())
			return new ResponseEntity<>("Invalid securities", HttpStatus.BAD_REQUEST);
		Master master = optionalM.get();
		portfolioComposition.setMaster(master);
		portfolioComposition.setSecurityName(master.getNameOfCompany());
		portfolioComposition.setExchangeName(master.getExchange());

		double price = Double.parseDouble(master.getLastPrice());
		portfolioComposition.setPrice(price);

		int units = portfolioComposition.getUnits();
		double allocatedValue = price * units;

		portfolioComposition.setAllocatedValue(Math.round(allocatedValue));
		portfolioComposition.setTotalTransaction(Math.round(allocatedValue));
		
		double investmentValue = portfolioHeader.getInvestmentValue();
		portfolioComposition.setInvestmentValue(investmentValue);
		
		
		//double availableBalance=portfolioComposition.getInvestmentValue() - portfolioComposition.getTotalTransaction();
		//portfolioComposition.setAvailableBalance(availableBalance);
		
        		
		
		/*
		 * int Id = portfolioComposition.getCompositionId() - 1;
		 * Optional<PortfolioComposition> pc = portfolioCompositionRepo.findById(Id);
		 * double previousTotalTransaction = 0; if (pc.isPresent()) {
		 * previousTotalTransaction = pc.get().getTotalTransaction();
		 * 
		 * }
		 */
		portfolioComposition.setTransactionDate(LocalDate.now());

		/*
		 * List<PortfolioComposition> list=portfolioCompositionRepo.findAll(); Asset
		 * asset=new Asset(); //String assetclass=asset.getAssetClass(); //double
		 * allocation=asset.getAllocation(); double limit=0; double
		 * availableBalance=portfolioHeader.getInvestmentValue();
		 * 
		 portfolioComposition.setTransactionDate(LocalDate.now());
		 * 
		 * if(assetclass.equals("EQUITIES")) { limit=(investmentValue/100)*allocation;
		 * allocatedValue=Math.max(0, limit); } if(assetclass.equals("CASH")) {
		 * limit=(investmentValue/100)*allocation; allocatedValue=Math.max(0, limit); }
		 * if(assetclass.equals("COMMODITIES")) {
		 * limit=(investmentValue/100)*allocation; allocatedValue=Math.max(0, limit); }
		 * 
		 * 
		 * if(list==null) { totalTransaction +=portfolioComposition.getAllocatedValue();
		 * if(totalTransaction<limit)
		 * portfolioComposition.setTotalTransaction(totalTransaction); else return
		 * ResponseEntity.status(HttpStatus.BAD_REQUEST).
		 * body("Available balance is not sufficient,limit is reached"); } else{
		 * 
		 * totalTransaction
		 * =portfolioComposition.getAllocatedValue()+previousTotalTransaction;
		 * 
		 * if(totalTransaction<limit) {
		 * portfolioComposition.setTotalTransaction(totalTransaction);
		 * availableBalance=investmentValue-totalTransaction;
		 * portfolioComposition.setAvailableBalance(availableBalance); } else return
		 * ResponseEntity.status(HttpStatus.BAD_REQUEST).
		 * body("Available balance is not sufficient,limit is reached"); }
		 */

		/*
		 * double returnPer=((totalTransaction-currentValue)/totalTransaction)*100;
		 * double returns=-((returnPer/100)*totalTransaction);
		 * portfolioComposition.setReturns(returns);
		 */
		if(allocatedValue>investmentValue) {
			return new ResponseEntity<>("you have exceeded your invested Amount,decrease the units",HttpStatus.BAD_REQUEST);
			
		}
		else {
		service.addCompo(portfolioComposition);

		return ResponseEntity.status(HttpStatus.OK).body("Security added Successfully!");
	}
	}

	@GetMapping("/fetchCompo")
	public ResponseEntity<List<PortfolioComposition>> getComposition() {
		List<PortfolioComposition> object = service.fetchComposition();
		return new ResponseEntity<>(object, HttpStatus.OK);
	}

	@GetMapping("/getData")
	public List<PortfolioCompositionDto> getData() {
		List<PortfolioComposition> list = portfolioCompositionRepo.findAll();
		List<PortfolioCompositionDto> listDto = new ArrayList<>();
		for (PortfolioComposition p : list) {
			PortfolioHeader ph = p.getPortfolioHeader();
			PortfolioCompositionDto dto = new PortfolioCompositionDto();
			dto.setPorfolioName(ph.getPortfolioName());
			dto.setFundMangerName(ph.getFundManagerName());
			dto.setThemeName(ph.getInvestmentTheme());
			dto.setBenchMark(ph.getBenchMark());
			dto.setInvestmentValue(ph.getInvestmentValue());
			// dto.setNoOfSecurities(p.getUnits());
			dto.setAllocatedValue(p.getAllocatedValue());
			listDto.add(dto);
		}
		return listDto;
	}

	@GetMapping("/fetchByName/{portfolioName}")
	public ResponseEntity<List<PortfolioComposition>> findByName(@PathVariable String portfolioName) {
		List<PortfolioComposition> object = service.findByName(portfolioName);
		if (object.isEmpty()) {
			throw new DataNotFoundException("Given name is not available");
		} else {
			return new ResponseEntity<>(object, HttpStatus.OK);
		}
	}
	
	 @DeleteMapping("/delete/{portfolioName}")
	  public ResponseEntity<String>delete(@PathVariable String portfolioName){
		  service.delete(portfolioName);
		  return new ResponseEntity<>("Data has been deleted successfully",HttpStatus.OK);
	  }
	

}