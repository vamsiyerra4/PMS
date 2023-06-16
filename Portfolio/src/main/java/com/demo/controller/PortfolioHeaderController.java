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
import org.springframework.web.bind.annotation.PutMapping;
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

@CrossOrigin(origins = "*")
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
	public ResponseEntity<String> addPortfolio(@RequestBody PortfolioHeader portfolioHeader,
			@PathVariable("themeName") String themeName) {
		Optional<Theme> optional = themeRepo.findById(themeName);
		if (!optional.isPresent())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid Theme");
		Theme theme = optional.get();
		portfolioHeader.setTheme(theme);
		portfolioHeader.setInvestmentTheme(themeName);
		portfolioHeader.setStatus("New");
		service.addPortfolio(portfolioHeader);
		return new ResponseEntity<>("Portfolio added Successfully!", HttpStatus.OK);
	}

	@GetMapping("/fetchPortfolio")
	public ResponseEntity<List<PortfolioHeader>> getAll() {
		List<PortfolioHeader> object = service.fetchPortfolio();
		return new ResponseEntity<>(object, HttpStatus.OK);
	}

	@GetMapping("/fetchPortfolioByName/{portfolioName}")
	public ResponseEntity<Optional<PortfolioHeader>> findByPortfolioName(@PathVariable String portfolioName) {
		Optional<PortfolioHeader> object = service.findByPortfolioName(portfolioName);
		if (object.isEmpty()) {
			throw new DataNotFoundException("Given portfolioname is not available");
		} else {
			return new ResponseEntity<>(object, HttpStatus.OK);
		}
	}

	@DeleteMapping("/closePortfolio/{portfolioName}")

	public ResponseEntity<String> softDeletePortfolio(@PathVariable("portfolioName") String portfolioName) {

		Optional<PortfolioHeader> optionalPortfolioHeader = repo.findById(portfolioName);

		if (optionalPortfolioHeader.isPresent()) {

			PortfolioHeader portfolioHeader = optionalPortfolioHeader.get();

			// Set the status of the PortfolioHeader to "closed"

			portfolioHeader.setStatus("Closed");

			repo.save(portfolioHeader);

			// Remove the records from the frontend

			// ...

			return ResponseEntity.ok("Portfolio Closed successfully");

		}

		return ResponseEntity.notFound().build();

	}
	@PutMapping("/update/{portfolioName}/{investmentValue}")
	public ResponseEntity<String> updateInvestmentValue(@PathVariable("investmentValue") double investmentValue,@PathVariable("portfolioName") String portfolioName){
		Optional<PortfolioHeader> optional= repo.findById(portfolioName);
		if(!optional.isPresent())
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Portfolio doest not exists");
		PortfolioHeader portfolioHeader=optional.get();
		portfolioHeader.setInvestmentValue(investmentValue);
		repo.save(portfolioHeader);
		return ResponseEntity.status(HttpStatus.OK).body("Investment value updated");
	}
}
