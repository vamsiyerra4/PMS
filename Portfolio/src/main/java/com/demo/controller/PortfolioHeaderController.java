package com.demo.controller;

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

import com.demo.exception.DataNotFoundException;
import com.demo.model.Master;
import com.demo.model.PortfolioHeader;
import com.demo.model.Theme;
import com.demo.model.ThemeAsset;
import com.demo.repository.PortfolioHeaderRepo;
import com.demo.repository.ThemeAssetRepo;
import com.demo.repository.ThemeRepo;
import com.demo.service.PortfolioHeaderService;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/portfolio")
public class PortfolioHeaderController {
	@Autowired
	PortfolioHeaderService service;
	@Autowired
	ThemeRepo themeRepo;
	@Autowired
	PortfolioHeaderRepo repo;
	@PostMapping("/addPortfolio/{themeName}")
    public ResponseEntity<String> addPortfolio(@RequestBody PortfolioHeader portfolioHeader,@PathVariable("themeName") String themeName)
	{   
		Optional<Theme> optional=themeRepo.findById(themeName);
		if (!optional.isPresent())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Theme");
		Theme theme = optional.get();
		portfolioHeader.setTheme(theme);
		portfolioHeader.setInvestmentTheme(themeName);
		service.addPortfolio(portfolioHeader);
		return new ResponseEntity<>("Portfolio added Successfully!",HttpStatus.OK);
	}
	
	
	  @GetMapping("/fetchPortfolio")
	  public ResponseEntity<List<PortfolioHeader>>getAll(){
	  List<PortfolioHeader>object=service.fetchPortfolio();
	  return new  ResponseEntity<>(object,HttpStatus.OK); }
	 
	  
	  @GetMapping("/fetchPortfolioByName/{portfolioName}") 
	  public ResponseEntity<Optional<PortfolioHeader>>findByPortfolioName(@PathVariable String portfolioName){ 
	  Optional<PortfolioHeader> object=service.findByPortfolioName(portfolioName);
	  if(object.isEmpty())
	  { 
		  throw new DataNotFoundException("Given portfolioname is not available"); 
		  }
	  else
	  { 
		  return new  ResponseEntity<>(object,HttpStatus.OK);
		  } 
	  }
	  }
