package com.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.demo.model.PortfolioComposition;

@Repository
public interface PortfolioCompositionRepo  extends JpaRepository<PortfolioComposition,Integer> {
   @Query("select p from PortfolioComposition p where p.portfolioHeader.portfolioName=?1")
	List<PortfolioComposition> findByPortfolioName(String portfolioName);
   @Query("select p from PortfolioComposition p where p.portfolioHeader.portfolioName=?1")
    public void deleteById(String portfolioName);

	
}


